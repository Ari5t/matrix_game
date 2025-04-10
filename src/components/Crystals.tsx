import styled from 'styled-components';

import CrystalGrid from './CrystalGrid';

import useConfigStore from '../store/config';
import { Block } from '../common/styled';

export const BackgroundBlock = styled(Block)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
`;

export const BackgroundElement = styled.div<{ $backgroundColor?: number }>`
  width: 64px;
  height: 64px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? '#383838' : '#333333'};
`;

function Crystals() {
  const { rows, cols } = useConfigStore((state) => state.config);

  return (
    <BackgroundBlock>
      {Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null)
      ).map((row, rowIndex) =>
        row.map((_, cellIndex) => (
          <BackgroundElement
            key={`${rowIndex}_${cellIndex}`}
            $backgroundColor={(rowIndex + cellIndex) % 2}
          />
        ))
      )}
      <CrystalGrid />
    </BackgroundBlock>
  );
}

export default Crystals;
