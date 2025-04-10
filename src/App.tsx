import { useEffect } from 'react';
import styled from 'styled-components';

import Crystals from './components/Crystals';

import useConfigStore from './store/config';
import useMatrixStore from './store/matrix';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

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
    <Wrapper>
      <Crystals />
    </Wrapper>
  );
}

export default App;
