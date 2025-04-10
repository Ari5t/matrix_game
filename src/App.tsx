import { useEffect, useState } from 'react';

import { randomFromInterval } from './utils/random';

import { crystalColors, Wrapper } from './common/styled';
import Crystals from './components/Crystals';
import { useConfigStore } from './store/config';


function App() {
  const [matrix, setMatrix] = useState<string[][]>([[]]);
  const { rows, cols, generationTime } = useConfigStore((state) => state.config);

  useEffect(function () {
    if (matrix.length === rows && matrix[matrix.length - 1].length === cols) return;

    const timer = setInterval(() => {
      setMatrix((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        const lastRowId = newMatrix.length - 1;
        const lastRow = newMatrix[lastRowId];
        const newCrystal = crystalColors[randomFromInterval(0, crystalColors.length - 1)];
        if (lastRow.length === cols) {
          newMatrix[newMatrix.length] = [newCrystal];
          return newMatrix;
        }
        newMatrix[lastRowId] = [...lastRow, newCrystal];
        return newMatrix;
      });
    }, generationTime);

    return function stopTimer() {
      clearInterval(timer);
    };
  }, [cols, generationTime, matrix, rows]);

  return (
    <Wrapper>
      <Crystals cols={cols} rows={rows} matrix={matrix} />
    </Wrapper>
  );
}

export default App;
