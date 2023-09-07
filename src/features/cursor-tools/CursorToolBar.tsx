import React from 'react'

// Components
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// Icons
import { Icon } from '@iconify/react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/state/store'
import { SET_CURSOR_TOOL } from 'src/state/toolbarSlice'
import { TOOL_LIST } from './tools'

export default function CursorTools() {
  const dispatch = useDispatch()
  const { cursorTool } = useSelector((state: RootState) => state.toolbar)

  const handleToolChange = (toolName: string) => {
    dispatch(SET_CURSOR_TOOL(toolName))
  }

  return (
    <Stack direction='row' spacing={2}>
      {TOOL_LIST.map(tool => (
        <Button
          key={tool.name}
          variant={cursorTool === tool.name ? 'contained' : 'outlined'}
          onClick={() => handleToolChange(tool.name)}
          startIcon={<Icon icon={tool.icon} />}
        >
          {tool.label}
        </Button>
      ))}
    </Stack>
  )
}
