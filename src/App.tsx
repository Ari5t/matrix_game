import { useEffect, useState } from 'react';

import { randomFromInterval } from './utils/random';

import { crystalColors, Wrapper } from './common/styled';
import Crystals from './components/Crystals';

const ROWS = Number(import.meta.env.VITE_ROWS);
const COLS = Number(import.meta.env.VITE_COLS);
const GENERATION_TIME = Number(import.meta.env.VITE_GENERATION_TIME);

function App() {
  const [matrix, setMatrix] = useState<string[][]>([[]]);

  useEffect(function () {
    if (matrix.length === ROWS && matrix[matrix.length - 1].length === COLS) return;

    const timer = setInterval(() => {
      setMatrix((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        const lastRowId = newMatrix.length - 1;
        const lastRow = newMatrix[lastRowId];
        const newCrystal = crystalColors[randomFromInterval(0, crystalColors.length - 1)];
        if (lastRow.length === COLS) {
          newMatrix[newMatrix.length] = [newCrystal];
          return newMatrix;
        }
        newMatrix[lastRowId] = [...lastRow, newCrystal];
        return newMatrix;
      });
    }, GENERATION_TIME);
    
    return function stopTimer() {
      clearInterval(timer);
    };
  }, [matrix]);

  return (
    <Wrapper>
      <Crystals cols={COLS} rows={ROWS} matrix={matrix} />
    </Wrapper>
  );
}

export default App;
