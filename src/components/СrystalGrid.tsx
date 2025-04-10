import { Block, CrystalIcon } from '../common/styled'
import crystalSrc from '../assets/crystal.svg'

interface CrystalGridProps {
  matrix: string[][]
}

function CrystalGrid({ matrix }: CrystalGridProps) {
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
