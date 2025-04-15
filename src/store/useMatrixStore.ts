import { create } from 'zustand';

import { getRandomColor } from '../utils/random';

interface MatrixStore {
  matrix: string[][];
  rows: number;
  cols: number;
  generationTime: number;
}

const useMatrixStore = create<MatrixStore>(() => ({
  matrix: [[]],
  rows: 7,
  cols: 7,
  generationTime: 1000,
}));

export const addCrystal = () =>
  useMatrixStore.setState((state) => {
    const newMatrix = [...state.matrix];
    const lastRowId = newMatrix.length - 1;
    const lastRow = newMatrix[lastRowId];
    const newCrystal = getRandomColor();
    if (lastRow.length === state.cols) {
      newMatrix[newMatrix.length] = [newCrystal];
      return { matrix: newMatrix };
    }
    newMatrix[lastRowId] = [...lastRow, newCrystal];
    return { matrix: newMatrix };
  });

export const updateConfig = (data: Partial<MatrixStore>) => useMatrixStore.setState({...data});

export default useMatrixStore;
