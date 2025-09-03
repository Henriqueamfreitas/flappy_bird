import { useEffect, useState } from 'react'

function CircularList() {
  const [initialList, setInitialList] = useState<number[]>([])
  const [partialList, setPartialList] = useState<number[]>([])


  const circularLIst = (init: number, limit: number, partial: number) => {
    let list = []
    for (let i = init; i <= limit; i += 1) {
      list.push(i)
    }
    setInitialList(list)
    return list.slice(0, partial)
  }
  useEffect(() => {
    const list = circularLIst(1, 10, 3)
    setPartialList(list)
  }, [])

  const handleNext = () => {
    const maxInitialList = initialList[initialList.length - 1]
    const maxPartialList = partialList[partialList.length - 1]
    if (maxInitialList === maxPartialList) {
      const newPartialList = [maxInitialList - 1, maxInitialList, initialList[0]]
      setPartialList(newPartialList)
      return
    }
    if (partialList[1] === maxInitialList) {
      const newPartialList = [maxInitialList, initialList[0], initialList[1]]
      setPartialList(newPartialList)
      return
    }
    if (partialList[0] === maxInitialList) {
      const newPartialList = [initialList[0], initialList[1], initialList[2]]
      setPartialList(newPartialList)
      return
    }
    const newPartialList = [maxPartialList - 1, maxPartialList, maxPartialList + 1]
    setPartialList(newPartialList)
    return
  }

  const handelPrevious = () => {
    const minPartialList = partialList[0]
    const minInitialList = initialList[0]
    const maxInitialList = initialList[initialList.length - 1]
    if (minInitialList === minPartialList) {
      setPartialList([maxInitialList, minInitialList, minInitialList + 1])
      return
    }
    if (partialList[1] === minInitialList) {
      setPartialList([maxInitialList - 1, maxInitialList, minInitialList])
      return
    }
    if (partialList[2] === minInitialList) {
      setPartialList([maxInitialList - 2, maxInitialList - 1, maxInitialList])
      return
    }

    const newPartialList = [minPartialList - 1, minPartialList, minPartialList + 1]
    setPartialList(newPartialList)
    return
  }

  return (
    <>
      <div>
        <button onClick={handelPrevious}>-</button>
        {partialList.join(', ')}
        <button onClick={handleNext}>+</button>
      </div>
    </>
  )
}

export default CircularList
