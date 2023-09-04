// Components
import Box from '@mui/material/Box'

// Canvas
import { CanvasProvider } from 'src/features/canvas/CanvasProvider'
import SVGCanvas from 'src/features/canvas/SvgCanvas'

const Dashboard = () => {
  return (
    <Box
      width='100%'
      height='100%'
      position='relative'
      overflow='hidden'
      id='canvas-container'
      sx={{ backgroundColor: 'grey.500' }}
    >
      <CanvasProvider>
        <SVGCanvas />
      </CanvasProvider>
    </Box>
  )
}

export default Dashboard
