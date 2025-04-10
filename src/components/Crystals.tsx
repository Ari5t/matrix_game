import CrystalGrid from './СrystalGrid'

import { BackgroundBlock, BackgroundElement } from '../common/styled'

interface CrystalGridProps {
  matrix: string[][]
  rows: number
  cols: number
}

function Crystals({ rows, cols, matrix }: CrystalGridProps) {
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
      <CrystalGrid matrix={matrix} />
    </BackgroundBlock>
  )
}

export default Crystals
