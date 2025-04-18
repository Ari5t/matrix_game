import { create } from 'zustand';

import { getRandomColor } from '../utils/random';

const GRID_SIZE_DEFAULT = 9;

interface Item {
  color?: string;
  backgroundId: number;
}
interface MatrixStore {
  matrix: Item[];
  rows: number;
  cols: number;
  generationTime: number;
}

const itemGenerate = (index: number, cols: number): Item => {
  return {
    color: undefined,
    backgroundId: (Math.floor(index / cols) + (index % cols)) % 2,
  };
};

const matrixStoreDefault = {
  matrix: Array.from(
    { length: GRID_SIZE_DEFAULT * GRID_SIZE_DEFAULT },
    (_, i) => itemGenerate(i, GRID_SIZE_DEFAULT)
  ),
  rows: GRID_SIZE_DEFAULT,
  cols: GRID_SIZE_DEFAULT,
  generationTime: 1000,
};

const useMatrixStore = create<MatrixStore>(() => matrixStoreDefault);

export const addCrystal = () => {
  useMatrixStore.setState((state) => {
    const newMatrix = [...state.matrix];
    const lastItemId = newMatrix.findIndex((item) => !item.color);

    if (lastItemId === undefined) return state;

    newMatrix[lastItemId] = {
      ...newMatrix[lastItemId],
      color: getRandomColor(),
    };

    return { matrix: newMatrix };
  });
};

export const removeCrystal = () => {
  useMatrixStore.setState((state) => {
    const newMatrix = [...state.matrix];
    const lastItemId = newMatrix.findIndex((item) => !item.color) - 1;
    const lastItem = newMatrix[lastItemId];
    const removeIds = new Set<number>();

    if (!lastItem) return state;

    if (
      lastItemId % state.cols >= 2 &&
      newMatrix[lastItemId - 1]?.color === lastItem.color &&
      newMatrix[lastItemId - 2]?.color === lastItem.color
    ) {
      for (let i = 0; i < 3; i++) {
        removeIds.add(lastItemId - i);
      }
    }

    if (
      Math.floor(lastItemId / state.cols) >= 2 &&
      newMatrix[lastItemId - state.cols * 1]?.color === lastItem.color &&
      newMatrix[lastItemId - state.cols * 2]?.color === lastItem.color
    ) {
      for (let i = 0; i < 3; i++) {
        removeIds.add(lastItemId - state.cols * i);
      }
    }

    for (const id of removeIds) {
      newMatrix[id].color = undefined;
    }

    return { matrix: newMatrix };
  });
};

export const updateConfig = (data: Partial<MatrixStore>) =>
  useMatrixStore.setState({ ...data });

export default useMatrixStore;
