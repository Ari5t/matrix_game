import styled from 'styled-components'
import SVG from 'react-inlinesvg'

const ROWS = Number(import.meta.env.VITE_ROWS)
const COLS = Number(import.meta.env.VITE_COLS)

export const crystalColors = [
  '#ffb3ba',
  '#ffdfba',
  '#ffffba',
  '#baffc9',
  '#bae1ff',
]

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`
export const CrystalIcon = styled(SVG)<{ $color: string }>`
  width: 64px;
  height: 64px;
  z-index: 2;

  & path {
    fill: ${({ $color }) => $color};
  }
`

export const Block = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${ROWS}, 1fr);
`

export const BackgroundBlock = styled(Block)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
`

export const BackgroundElement = styled.div<{ $backgroundColor?: number }>`
  width: 64px;
  height: 64px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? '#383838' : '#333333'};
`
