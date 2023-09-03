import React from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/state/store'
import { SET_ZOOM_PERCENTAGE } from 'src/state/toolbarSlice'

// Components
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

// Icons
import { Icon } from '@iconify/react'

export default function Zoom() {
  const dispatch = useDispatch()
  const { zoomPercentage } = useSelector((state: RootState) => state.toolbar)

  const zoomIn = () => dispatch(SET_ZOOM_PERCENTAGE(zoomPercentage + 10))
  const zoomOut = () => dispatch(SET_ZOOM_PERCENTAGE(zoomPercentage - 10))

  return (
    <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Button onClick={zoomIn}>
        <Icon icon='tabler:zoom-in' />
      </Button>
      <Box sx={{ width: 50 }}>{zoomPercentage}%</Box>
      <Button onClick={zoomOut}>
        <Icon icon='tabler:zoom-out' />
      </Button>
    </ButtonGroup>
  )
}
