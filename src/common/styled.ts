import styled from 'styled-components'

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

export const Block = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${ROWS}, 1fr);
`
