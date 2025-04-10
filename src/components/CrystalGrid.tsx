import styled from 'styled-components'
import SVG from 'react-inlinesvg'

import useMatrixStore from '../store/matrix'
import { Block } from '../common/styled'

import crystalSrc from '../assets/crystal.svg'

export const CrystalIcon = styled(SVG)<{ $color: string }>`
  width: 64px;
  height: 64px;
  z-index: 2;

  & path {
    fill: ${({ $color }) => $color};
  }
`

function CrystalGrid() {
    const { matrix } = useMatrixStore();

  return (
    <Block>
      {matrix.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <CrystalIcon
            key={`${rowIndex}_${cellIndex}`}
            src={crystalSrc}
            $color={cell}
          />
        ))
      )}
    </Block>
  )
}

export default CrystalGrid
