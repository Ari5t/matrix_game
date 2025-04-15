import { create } from 'zustand';

import useConfigStore from './config';

import { getRandomColor } from '../utils/random';

interface MatrixStore {
  matrix: string[][];
  addCrystal: () => void;
}

const useMatrixStore = create<MatrixStore>((set) => ({
  matrix: [[]],
  addCrystal: () =>
    set((state) => {
      const newMatrix = [...state.matrix];
      const lastRowId = newMatrix.length - 1;
      const lastRow = newMatrix[lastRowId];
      const newCrystal = getRandomColor();
      if (lastRow.length === useConfigStore.getState().config.cols) {
        newMatrix[newMatrix.length] = [newCrystal];
        return { matrix: newMatrix };
      }
      newMatrix[lastRowId] = [...lastRow, newCrystal];
      return { matrix: newMatrix };
    }),
}));

export default useMatrixStore;
