import React, { useState, useEffect, useRef } from 'react'
import { useCanvas } from 'src/features/canvas/CanvasProvider'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/state/store'

export default function DrawListener() {
  const [currentPath, setCurrentPath] = useState<string | null>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const {
    mouseData: { mousePosition, isMouseDown }
  } = useCanvas()

  // Redux
  const { draw } = useSelector((state: RootState) => state.toolStyle)

  useEffect(() => {
    if (!isMouseDown) return

    setCurrentPath(prev => {
      if (prev === null) {
        return `M ${mousePosition.x} ${mousePosition.y}`
      } else {
        return `${prev} L ${mousePosition.x} ${mousePosition.y}`
      }
    })
  }, [mousePosition])

  useEffect(() => {
    if (isMouseDown || !currentPath || !pathRef.current) return

    const svgContainer = document.getElementById('svg-canvas')
    const pathHTML = pathRef.current.outerHTML

    if (svgContainer) {
      svgContainer.insertAdjacentHTML('beforeend', pathHTML)
    }

    setCurrentPath(null)
  }, [isMouseDown])

  if (currentPath)
    return (
      <path
        ref={pathRef}
        d={currentPath}
        style={{
          ...draw
        }}
      />
    )

  return null
}
