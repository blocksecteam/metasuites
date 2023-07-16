import { useEffect, useRef, useState } from 'react'

const useSyncState = <T>(state: T) => {
  const cbRef = useRef<(v: T) => void>()
  const [data, setData] = useState<T>(state)

  useEffect(() => {
    cbRef.current && cbRef.current(data)
  }, [data])

  return [
    data,
    (val: T, callback: (v: T) => void) => {
      cbRef.current = callback
      setData(val)
    }
  ]
}

export default useSyncState
