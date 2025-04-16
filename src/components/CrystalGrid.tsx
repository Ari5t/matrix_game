import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import crystalSrc from '../assets/crystal.svg';

interface CrystalGridProps {
  color: string;
}

function CrystalGrid({ color }: CrystalGridProps) {
  return (
    <div className='wrapper'>
      <CrystalIcon src={crystalSrc} $color={color} />
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
