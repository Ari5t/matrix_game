import styled from 'styled-components';

import CrystalGrid from './CrystalGrid';
import useMatrixStore from '../store/useMatrixStore';

function Crystals() {
  const { matrix, rows, cols } = useMatrixStore();
  return (
    <Wrapper rows={rows} cols={cols}>
      {matrix.map((item, itemIndex) => (
        <BackgroundBlock
          key={`${itemIndex}_item`}
          $backgroundId={item.backgroundId}
        >
          {item.color && <CrystalGrid color={item.color} />}
        </BackgroundBlock>
      ))}
    </Wrapper>
  );
}

export default Crystals;

const Wrapper = styled.div<{ rows: number; cols: number }>`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;

  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);

  .wrapper {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
    grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  }
`;

const BackgroundBlock = styled.div<{ $backgroundId: number }>`
  width: ${({ theme }) => `${theme.squareSize}px`};
  height: ${({ theme }) => `${theme.squareSize}px`};
  background-color: ${({ $backgroundId, theme }) =>
    $backgroundId ? theme.colors.square : theme.colors.squareAlt};
`;
