import React, { useState, useMemo } from 'react'
// @mui
import Box from '@mui/material/Box'
// Local
import ResizeBox from './ResizeBox'
// Hooks
import { useCavasUpdater } from 'src/hooks/useCanvasUpdater'
import { useSelectedElements } from 'src/hooks/useSelectedElements'

interface SelectedElementsProps {}

export default function SelectedElements({}: SelectedElementsProps) {
  const { selectedElements } = useSelectedElements()
  const { updateSubscriber } = useCavasUpdater()

  const elementData = useMemo(
    () =>
      selectedElements.map(el => {
        const rect = el.getBoundingClientRect()
        const { x, y, width, height } = rect

        const container = document.getElementById('canvas-container')
        if (!container) throw new Error('Could not find element with id "canvas-container"')

        const { x: containerX, y: containerY } = container.getBoundingClientRect()

        const boxPosition = {
          x: (width < 20 ? Math.ceil(x - 5) : Math.ceil(x)) - containerX,
          y: (height < 20 ? Math.ceil(y - 5) : Math.ceil(y)) - containerY,
          width: width < 20 ? Math.ceil(width + 10) : Math.ceil(width),
          height: height < 20 ? Math.ceil(height + 10) : Math.ceil(height)
        }

        return {
          el,
          rect,
          boxPosition
        }
      }),
    [selectedElements, updateSubscriber]
  )

  return (
    <>
      {elementData.map(({ boxPosition, el, rect }, index) => {
        return (
          <>
            <ResizeBox el={el} boxPosition={boxPosition} rect={rect} />
          </>
        )
      })}
    </>
  )
}
