import { create } from 'zustand';

import useConfigStore from './config';
import { crystalColors } from '../common/styled';

import { randomFromInterval } from '../utils/random';

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
      const newCrystal = crystalColors[randomFromInterval(0, crystalColors.length - 1)];
      if (lastRow.length === useConfigStore.getState().config.cols) {
        newMatrix[newMatrix.length] = [newCrystal];
        return { matrix: newMatrix };
      }
      newMatrix[lastRowId] = [...lastRow, newCrystal];
      return { matrix: newMatrix };
    }),
}));

export default useMatrixStore;
