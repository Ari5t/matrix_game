import styled from 'styled-components';

import CrystalGrid from './CrystalGrid';

interface CrystalsProps {
  rows: number;
  cols: number;
}

function Crystals({ rows, cols }: CrystalsProps) {
  return (
    <Wrapper rows={rows} cols={cols}>
      {Array(rows)
        .fill(Array(cols).fill(null))
        .map((row, rowIndex) =>
          row.map((_: null, cellIndex: number) => (
            <BackgroundBlock
              key={`${rowIndex}_${cellIndex}`}
              backgroundColor={(rowIndex + cellIndex) % 2}>
              <CrystalGrid row={rowIndex} col={cellIndex} />
            </BackgroundBlock>
          ))
        )}
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

const BackgroundBlock = styled.div<{ backgroundColor: number }>`
  width: ${({ theme }) => `${theme.squareSize}px`};
  height: ${({ theme }) => `${theme.squareSize}px`};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors.square : theme.colors.squareAlt};
`;
