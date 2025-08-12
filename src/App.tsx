import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [positionX, setPositionX] = useState<number>(0)
  const [positionY, setPositionY] = useState<number>(0)
  const [space, setSpace] = useState(150) // 2 times the height from the bird .bird class
  const [numberOfTubes, setNumberOfTubes] = useState(10)
  const [horizontalSpaceBetweenTubes, setHorizontalSpaceBetweenTubes] = useState(400)

  useEffect(() => {
    document.documentElement.style.setProperty('--height', `${positionX}px`);
  }, [positionX])

  useEffect(() => {
    document.documentElement.style.setProperty('--positionY', `${positionY}px`);
  }, [positionY])

  useEffect(() => {
    const interval = 10
    const verticalSpeed = window.innerHeight / 1000

    const timer = setInterval(() => {
      setPositionX((prev: number) => {
        if (prev >= window.innerHeight - 50) {
          alert('Endgame')
          clearInterval(timer)
          return window.innerHeight - 50
        }
        return prev + verticalSpeed
      })
    }, interval);

    return () => clearInterval(timer)
  }, [])

  const handleClick = () => {
    setPositionX(prev => prev - 50)
    setPositionY(prev => prev + 50)
  }
  // the height is 1
  // the minimum space that it must be for the bird to pass
  // the maximum space is 3 times the height of the bird
  // so the size of the two tubes combined must be 1 - space
  // the first tube must measure (1 - space) * delta
  // the second tube must measure (1 - space) * (1 - delta)

  return (
    <>
      <div onClick={handleClick} className='main_container'>
        <div className='bird'></div>
        {/* <button onClick={handleClick}>+</button> */}
        {
          Array.from({ length: numberOfTubes }).map((_, i) => {
            const leftPosition = (i + 1) * 2 * horizontalSpaceBetweenTubes;
            return (
              <React.Fragment key={i}>
                <div className="tube_top" style={{ left: `${leftPosition}px` }}></div>
                <div className="tube_bottom" style={{ left: `${leftPosition}px` }}></div>
              </React.Fragment>
            )
          })
        }

      </div>
    </>
  )
}

export default App
