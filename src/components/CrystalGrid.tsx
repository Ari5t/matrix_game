import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import useMatrixStore from '../store/useMatrixStore';

import crystalSrc from '../assets/crystal.svg';

interface CrystalGridProps {
  row: number;
  col: number;
}

function CrystalGrid({ row, col }: CrystalGridProps) {
  const { matrix } = useMatrixStore();

  if (!(matrix[row] && matrix[row][col])) return;

  return (
    <div className='wrapper'>
      <CrystalIcon src={crystalSrc} $color={matrix[row][col]} />
    </div>
  );
}

export default CrystalGrid;

export const CrystalIcon = styled(SVG)<{ $color: string }>`
  width: ${({ theme }) => `${theme.squareSize}px`};
  height: ${({ theme }) => `${theme.squareSize}px`};
  z-index: 2;

  & path {
    fill: ${({ $color }) => $color};
  }
`;
