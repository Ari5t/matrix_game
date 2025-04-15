import { useEffect } from 'react';
import styled from 'styled-components';

import Crystals from './components/Crystals';

import useConfigStore from './store/config';
import useMatrixStore from './store/matrix';

function App() {
  const { rows, cols, generationTime } = useConfigStore((state) => state.config);
  const { addCrystal, matrix } = useMatrixStore();

  useEffect(function () {
      if (matrix.length === rows && matrix[matrix.length - 1].length === cols) return;

      const timer = setInterval(() => {
        addCrystal();
      }, generationTime);

      return function stopTimer() {
        clearInterval(timer);
      };
    
  }, [addCrystal, cols, generationTime, matrix, rows]);

  return (
    <Wrapper rows={rows} cols={cols}>
      <Crystals rows={rows} cols={cols} />
    </Wrapper>
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
  min-width: ${({ cols }) => cols * 64}px;
  min-height: ${({ rows }) => rows * 64}px;
`;
