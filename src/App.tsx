import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

import crystalSrc from './assets/crystal.svg'

const ROWS = 7
const COLS = 7

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`
const CrystalIcon = styled(SVG)<{ $color: string }>`
  width: 64px;
  height: 64px;
  z-index: 2;

  & path {
    fill: ${({ $color }) => $color};
  }
`

const Block = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${ROWS}, 1fr);
`

const BackgroundBlock = styled(Block)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
`

const BackgroundElement = styled.div<{ $backgroundColor?: number }>`
  width: 64px;
  height: 64px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? '#383838' : '#333333'};
`

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff']

function App() {
  const [matrix, setMatrix] = useState<string[][]>([[]])

  useEffect(
    function () {
      if (matrix.length === ROWS && matrix[matrix.length - 1].length === COLS)
        return

      const timer = setInterval(() => {
        setMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix]
          const newCrystal = colors[randomIntFromInterval(0, colors.length - 1)]
          if (newMatrix[newMatrix.length - 1].length !== COLS) {
            newMatrix[newMatrix.length - 1] = [
              ...newMatrix[newMatrix.length - 1],
              newCrystal,
            ]
          } else {
            newMatrix[newMatrix.length] = [newCrystal]
          }

          return newMatrix
        })
      }, 500)

      return function stopTimer() {
        clearInterval(timer)
      }
    },
    [matrix]
  )

  console.log('Matrix updated: ', matrix)

  return (
    <Wrapper>
      <BackgroundBlock>
        {Array.from({ length: ROWS }, () =>
          Array.from({ length: COLS }, () => null)
        ).map((row, rowIndex) =>
          row.map((_, cellIndex) => (
            <BackgroundElement
              key={`${rowIndex}_${cellIndex}`}
              $backgroundColor={(rowIndex + cellIndex) % 2}
            />
          ))
        )}
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
      </BackgroundBlock>
    </Wrapper>
  )
}

export default App
