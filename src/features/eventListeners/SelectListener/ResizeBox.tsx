import React, { useState } from 'react'
// @mui
import Box from '@mui/material/Box'
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
}

type Drag = {
  startX: number
  startY: number
}

export default function ResizeBox({ el, boxPosition, rect, updatePosition }: ResizeBoxProps) {
  const element = SVG(el)

  const { zoomPercentage } = useSelector((state: RootState) => state.toolbar)
  const zoomInt = zoomPercentage / 100

  const handleDragStop = (e: any, d: DraggableData) => {
    const { x, y } = d
    const newX = (x - boxPosition.x) * zoomInt
    const newY = (y - boxPosition.y) * zoomInt

    element.dmove(newX, newY)
    updatePosition()
  }

  const handleResizeStop = (
    e: any,
    direction: string,
    ref: HTMLElement,
    delta: ResizableDelta,
    position: { x: number; y: number }
  ) => {
    const width = parseInt(ref.style.width) * zoomInt
    const height = parseInt(ref.style.height) * zoomInt
    const x = parseInt(ref.style.left) * zoomInt
    const y = parseInt(ref.style.top) * zoomInt

    const newX = (position.x - boxPosition.x) * zoomInt
    const newY = (position.y - boxPosition.y) * zoomInt

    element.size(width, height)
    element.dmove(newX, newY)
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
