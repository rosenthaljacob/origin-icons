import React from 'react'
// @mui
import Box from '@mui/material/Box'

interface SelectedElementsProps {
  selectedElements: SVGElement[]
}

export default function SelectedElements({ selectedElements }: SelectedElementsProps) {
  const elementData = selectedElements.map(el => {
    const rect = el.getBoundingClientRect()
    const { x, y, width, height } = rect

    const container = document.getElementById('canvas-container')
    if (!container) throw new Error('Could not find element with id "canvas-container"')

    const { x: containerX, y: containerY } = container.getBoundingClientRect()

    const boxPosition = {
      x: (width < 20 ? Math.ceil(x - 5) : Math.ceil(x)) - containerX - 5,
      y: (height < 20 ? Math.ceil(y - 5) : Math.ceil(y)) - containerY - 5,
      width: width < 20 ? Math.ceil(width + 10) : Math.ceil(width) + 10,
      height: height < 20 ? Math.ceil(height + 10) : Math.ceil(height) + 10
    }

    return {
      el,
      rect,
      boxPosition
    }
  })

  return (
    <>
      {elementData.map(({ boxPosition, el, rect }, index) => {
        return (
          <Box
            key={index}
            component='span'
            position='absolute'
            top={boxPosition.y}
            left={boxPosition.x}
            width={boxPosition.width}
            height={boxPosition.height}
            border={2}
            borderColor='primary.main'
          />
        )
      })}
    </>
  )
}
