import { useEffect } from 'react';

import { Wrapper } from './common/styled';
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
    <Wrapper>
      <Crystals />
    </Wrapper>
  );
}

export default App;
