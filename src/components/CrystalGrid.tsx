import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import useMatrixStore from '../store/useMatrixStore';

import crystalSrc from '../assets/crystal.svg';

function CrystalGrid() {
  const { matrix } = useMatrixStore();

  return (
    <div className='wrapper'>
      {matrix.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <CrystalIcon
            key={`${rowIndex}_${cellIndex}`}
            src={crystalSrc}
            $color={cell}
          />
        ))
      )}
    </div>
  );
}

export default CrystalGrid;

export const CrystalIcon = styled(SVG)<{ $color: string }>`
  width: 64px;
  height: 64px;
  z-index: 2;

  & path {
    fill: ${({ $color }) => $color};
  }
`;
