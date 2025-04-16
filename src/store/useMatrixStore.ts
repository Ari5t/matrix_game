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
    const lastRowId = newMatrix.findIndex((item) => !item.color);

    if (lastRowId === undefined) return { matrix: newMatrix };

    newMatrix[lastRowId] = {
      ...newMatrix[lastRowId],
      color: getRandomColor(),
    };

    return { matrix: newMatrix };
  });
};

export const updateConfig = (data: Partial<MatrixStore>) =>
  useMatrixStore.setState({ ...data });

export default useMatrixStore;
