import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/state/store'

type Pan = {
  x: number
  y: number
}

type MousePosition = {
  x: number
  y: number
}

interface MousePositionContextProps {
  mouseData: {
    relativeMousePosition: MousePosition
    mousePosition: MousePosition
    client: MousePosition
    isMouseDown: boolean
  }
  pan: Pan

  updateMousePosition: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
  setMouseDown: (down: boolean) => void
  setPan: React.Dispatch<React.SetStateAction<Pan>>
}

export const MousePositionContext = createContext<MousePositionContextProps | undefined>(undefined)

interface MousePositionProviderProps {
  children: ReactNode
}

// Provider component
export const CanvasProvider: React.FC<MousePositionProviderProps> = ({ children }) => {
  // const [relativeMousePosition, setRelativeMousePosition] = useState({ x: 0, y: 0, timeStamp: 0 })
  // const [client, setClient] = useState({ x: 0, y: 0 })
  // const [isMouseDown, setMouseDown] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const [mouseData, setMouseData] = useState({
    relativeMousePosition: { x: 0, y: 0 },
    mousePosition: { x: 0, y: 0 },
    client: { x: 0, y: 0 },
    isMouseDown: false
  })

  // Redux
  const { zoomPercentage } = useSelector((state: RootState) => state.toolbar)
  const timesBy = zoomPercentage / 100

  const updateMousePosition = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMouseData({
      relativeMousePosition: { x, y },
      mousePosition: { x: x * timesBy, y: y * timesBy },
      client: { x: e.clientX, y: e.clientY },
      isMouseDown: e.buttons === 1
    })
  }

  const setMouseDown = (down: boolean) => {
    setMouseData({
      ...mouseData,
      isMouseDown: down
    })
  }

  // Context value
  const value: MousePositionContextProps = useMemo(
    () => ({
      mouseData,
      pan,
      updateMousePosition,
      setMouseDown,
      setPan
    }),
    [pan, mouseData, updateMousePosition, setMouseDown, setPan]
  )

  return <MousePositionContext.Provider value={value}>{children}</MousePositionContext.Provider>
}

export const useCanvas = (): MousePositionContextProps => {
  const context = useContext(MousePositionContext)
  if (!context) {
    throw new Error('useMousePosition must be used within a MousePositionProvider')
  }

  return context
}
