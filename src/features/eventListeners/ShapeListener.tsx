import React, { useState, useEffect, useRef } from 'react'
import { useCanvas } from 'src/features/canvas/CanvasProvider'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/state/store'
// Utils
import { calculateEllipse, calculateCircle, calculateRectangle, calculateLine } from 'src/utils/elementCreation'

export const SUPPORTED_SHAPES = ['circle', 'ellipse', 'rectangle', 'line']

interface ShapePoint {
  x: number
  y: number
}

interface CurrentShape {
  start: ShapePoint
  currentPos: ShapePoint
}

export default function ShapeListener() {
  const [currentShape, setCurrentShape] = useState<CurrentShape | null>(null)
  const shapeRef = useRef<SVGElement>(null)

  // Redux
  const { shape, line } = useSelector((state: RootState) => state.toolStyle)
  const { cursorTool } = useSelector((state: RootState) => state.toolbar)

  const {
    mouseData: { mousePosition, isMouseDown }
  } = useCanvas()

  useEffect(() => {
    if (!isMouseDown) return

    setCurrentShape(prev => {
      if (prev === null) {
        return { start: mousePosition, currentPos: mousePosition }
      } else {
        return { ...prev, currentPos: mousePosition }
      }
    })
  }, [mousePosition])

  // Mouse up
  useEffect(() => {
    if (isMouseDown || !currentShape || !shapeRef.current) return

    const svgContainer = document.getElementById('svg-canvas')
    const data = shapeRef.current.outerHTML

    if (svgContainer) {
      svgContainer.insertAdjacentHTML('beforeend', data)
    }

    setCurrentShape(null)
  }, [isMouseDown])

  const ellipseData = currentShape ? calculateEllipse(currentShape.start, currentShape.currentPos) : {}

  if (!currentShape) return null

  if (cursorTool === 'circle') {
    const circleData = calculateCircle(currentShape.start, currentShape.currentPos)

    return <circle ref={shapeRef as any} {...circleData} style={shape} />
  }

  if (cursorTool === 'ellipse') {
    return <ellipse ref={shapeRef as any} {...ellipseData} style={shape} />
  }

  if (cursorTool === 'rectangle') {
    const rectangleData = calculateRectangle(currentShape.start, currentShape.currentPos)

    return <rect ref={shapeRef as any} {...rectangleData} style={shape} />
  }

  if (cursorTool === 'line') {
    const lineData = calculateLine(currentShape.start, currentShape.currentPos)

    return <line ref={shapeRef as any} {...lineData} style={line} />
  }

  return null
}
