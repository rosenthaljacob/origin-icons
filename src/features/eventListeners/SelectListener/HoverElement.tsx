import React, { useMemo } from 'react'
// @mui
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
// Hooks
import { useCavasUpdater } from 'src/hooks/useCanvasUpdater'

interface HoverElementProps {
  hoverElement: SVGElement | null
}

export default function HoverElement({ hoverElement }: HoverElementProps) {
  const { updateSubscriber } = useCavasUpdater()

  const { x, y, width, height } = useMemo(() => {
    if (!hoverElement || typeof window === 'undefined') return { x: 0, y: 0, width: 0, height: 0 }
    const container = document.getElementById('canvas-container')
    if (!container) throw new Error('Could not find element with id "canvas-container"')

    const { x: containerX, y: containerY } = container.getBoundingClientRect()
    const { x, y, width, height } = hoverElement.getBoundingClientRect()

    // Ensure small elements are still visible and numbers are rounded
    const safeX = width < 10 ? Math.ceil(x - 5) : Math.ceil(x)
    const safeY = height < 10 ? Math.ceil(y - 5) : Math.ceil(y)
    const safeWidth = width < 10 ? Math.ceil(width + 10) : Math.ceil(width)
    const safeHeight = height < 10 ? Math.ceil(height + 10) : Math.ceil(height)

    return { x: safeX - containerX, y: safeY - containerY, width: safeWidth, height: safeHeight }
  }, [hoverElement, updateSubscriber])

  const theme = useTheme()

  const primary = theme.palette.primary.main

  if (!hoverElement) return null

  return (
    <>
      <Box component='span' position='absolute' top={y} left={x} width={width} borderTop={`1px solid ${primary}`} />
      <Box component='span' position='absolute' top={y} left={x} height={height} borderLeft={`1px solid ${primary}`} />
      <Box
        component='span'
        position='absolute'
        top={y}
        left={x + width}
        height={height}
        borderRight={`1px solid ${primary}`}
      />
      <Box
        component='span'
        position='absolute'
        top={y + height}
        left={x}
        width={width}
        borderBottom={`1px solid ${primary}`}
      />
    </>
  )
}
