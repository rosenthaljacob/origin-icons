import React, { useState } from 'react'
// @mui
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
// Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/state/store'
// SVG
import { SVG } from '@svgdotjs/svg.js'
import { Rnd, DraggableData, ResizableDelta } from 'react-rnd'

interface ResizeBoxProps {
  el: SVGElement
  boxPosition: {
    x: number
    y: number
    width: number
    height: number
  }
  updatePosition: () => void
  rect: DOMRect
  selectedElements: SVGElement[]
}

type Drag = {
  startX: number
  startY: number
}

export default function ResizeBox({ el, boxPosition, rect, updatePosition, selectedElements }: ResizeBoxProps) {
  const theme = useTheme()

  const { zoomPercentage } = useSelector((state: RootState) => state.toolbar)
  const zoomInt = zoomPercentage / 100

  const handleDragStop = (e: any, d: DraggableData) => {
    const { x, y } = d
    const newX = (x - boxPosition.x) * zoomInt
    const newY = (y - boxPosition.y) * zoomInt

    selectedElements.forEach(el => {
      const element = SVG(el)
      element.dmove(newX, newY)
    })
    updatePosition()
  }

  const handleResizeStop = (
    e: any,
    direction: string,
    ref: HTMLElement,
    delta: ResizableDelta,
    position: { x: number; y: number }
  ) => {
    const prevWidth = boxPosition.width
    const prevHeight = boxPosition.height

    const newX = (position.x - boxPosition.x) * zoomInt
    const newY = (position.y - boxPosition.y) * zoomInt

    const width = parseInt(ref.style.width) / zoomInt
    const height = parseInt(ref.style.height) / zoomInt

    selectedElements.forEach(el => {
      const elementRect = el.getBoundingClientRect()
      const widthRatio = elementRect.width / prevWidth
      const heightRatio = elementRect.height / prevHeight
      const newWidth = width * widthRatio
      const newHeight = height * heightRatio

      const element = SVG(el)

      element.size(newWidth, newHeight)
      element.dmove(newX, newY)
    })
    updatePosition()
  }

  return (
    <Rnd
      size={boxPosition}
      position={boxPosition}
      style={{
        border: '1px solid black'
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    ></Rnd>
  )
}
