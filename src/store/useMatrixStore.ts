import { create } from 'zustand';

import matrixServices from '../services/matrixServices';

const GRID_SIZE_DEFAULT = 9;

export interface Item {
  color?: string;
  backgroundId: number;
  remove: () => void;
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
    remove() {
      this.color = '#000';
      setTimeout(() => {
        this.color = undefined;
      }, 1000);
    }
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
    return { matrix: matrixServices.add(state.matrix) };
  });
};

export const removeCrystal = async () => {
  useMatrixStore.setState((state) => {
    return { matrix: matrixServices.remove(state.matrix, state.cols) };
  });
};

export const updateConfig = (data: Partial<MatrixStore>) =>
  useMatrixStore.setState({ ...data });

export default useMatrixStore;
