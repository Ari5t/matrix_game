import { useEffect, useState } from 'react'

const ROWS = 6
const COLS = 6

function App() {
  const [matrix, setMatrix] = useState<number[][]>([[]])

  useEffect(
    function () {
      if (matrix.length === ROWS && matrix[matrix.length - 1].length === COLS)
        return

      const timer = setInterval(() => {
        setMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix]
          if (newMatrix[newMatrix.length - 1].length !== COLS) {
            newMatrix[newMatrix.length - 1] = [
              ...newMatrix[newMatrix.length - 1],
              Math.random() > 0.5 ? 1 : 0,
            ]
          } else {
            newMatrix[newMatrix.length] = [Math.random() > 0.5 ? 1 : 0]
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
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: cell ? 'black' : 'white',
                border: '1px solid gray',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
