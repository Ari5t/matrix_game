import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Crystals from './components/Crystals';

import useMatrixStore, { addCrystal } from './store/useMatrixStore';

const theme = {
  squareSize: 64,
  colors: {
    square: '#333333',
    squareAlt: '#383838',
  }
}

function App() {
  const { matrix, cols, rows, generationTime } = useMatrixStore();

  useEffect(function () {
    if (matrix[matrix.length - 1].color !== undefined) return;

    const timer = setInterval(() => {
      addCrystal();
    }, generationTime);

    return function stopTimer() {
      clearInterval(timer);
    };
    
  }, [cols, generationTime, matrix, rows]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper rows={rows} cols={cols}>
        <Crystals />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

export const Wrapper = styled.div<{ rows: number; cols: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  min-width: ${({ cols, theme }) => cols * theme.squareSize}px;
  min-height: ${({ rows, theme }) => rows * theme.squareSize}px;
`;
