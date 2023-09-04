import React, { useState } from 'react'
import { useCanvas } from './CanvasProvider'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from 'src/state/store'

// Components
import Box from '@mui/material/Box'

// Event Listeners
import PanListener from 'src/features/eventListeners/PanListener'
import DrawListener from '../eventListeners/DrawListener'
import SelectListener from '../eventListeners/SelectListener/SelectListener'

const SVGCanvas: React.FC = () => {
  const {
    // mousePosition,
    updateMousePosition,
    pan,
    setMouseDown
  } = useCanvas()

  // Redux
  const { zoomPercentage, cursorTool } = useSelector((state: RootState) => state.toolbar)

  // Define SVG size and viewBox
  const widthConst = 600
  const heightConst = 600
  const viewBox = `0 0 ${widthConst} ${heightConst}`

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    updateMousePosition(e)
  }

  return (
    <>
      <Box
        left={pan.x}
        top={pan.y}
        border='1px solid black'
        position={'absolute'}
        p={0}
        sx={{
          backgroundColor: 'white'
        }}
      >
        <svg
          id='svg-canvas'
          width={widthConst * (zoomPercentage / 100)}
          height={heightConst * (zoomPercentage / 100)}
          viewBox={viewBox}
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
          onMouseMove={handleMouseMove}
        >
          {cursorTool === 'pan' && <PanListener />}
          {cursorTool === 'draw' && <DrawListener />}
        </svg>
      </Box>
      <SelectListener />
    </>
  )
}

export default SVGCanvas
