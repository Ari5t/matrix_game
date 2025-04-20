import { Item } from '../store/useMatrixStore';
import { getRandomColor } from '../utils/random';

interface IMatrixServices {
  remove: (matrix: Item[], cols: number) => Item[];
}

class MatrixServices implements IMatrixServices {
  public add(matrix: Item[]) {
    const newMatrix = [...matrix];
    const lastItemId = newMatrix.findIndex((item) => !item.color);

    if (lastItemId === undefined) return matrix;

    newMatrix[lastItemId] = {
      ...newMatrix[lastItemId],
      color: getRandomColor(),
    };

    return newMatrix;
  }

  public remove(matrix: Item[], cols: number): Item[] {
    const newMatrix = [...matrix];
    const lastItemId = newMatrix.findLastIndex((item) => item.color);

    for (let index = 0; index <= lastItemId; index++) {
      const item = matrix[index];
      const removeIds = new Set<number>();

      if (
        index % cols >= 2 &&
        matrix[index - 1]?.color === item.color &&
        matrix[index - 2]?.color === item.color
      ) {
        for (let i = 0; i < 3; i++) {
          removeIds.add(index - i);
        }
      }

      if (
        Math.floor(index / cols) >= 2 &&
        matrix[index - cols * 1]?.color === item.color &&
        matrix[index - cols * 2]?.color === item.color
      ) {
        for (let i = 0; i < 3; i++) {
          removeIds.add(index - cols * i);
        }
      }

      for (const id of removeIds) {
        newMatrix[id].color = undefined;
      }

      for (let index = 0; index <= lastItemId; index++) {
        if (lastItemId === index) break;
        if (newMatrix[index].color) continue;

        for (let indexNear = index + 1; indexNear <= lastItemId; indexNear++) {
          if (newMatrix[indexNear].color === undefined) continue;

          newMatrix[index].color = newMatrix[indexNear].color;
          newMatrix[indexNear].color = undefined;

          break;
        }
      }
    }

    if (
      newMatrix.findIndex((item) => !item.color) === lastItemId + 1 ||
      lastItemId === newMatrix.length - 1
    ) return newMatrix;

    return this.remove(newMatrix, cols);
  }
}

export default new MatrixServices();
