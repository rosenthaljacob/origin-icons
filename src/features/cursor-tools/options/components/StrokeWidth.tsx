import React from 'react'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface StrokeWidthProps {
  strokeWidth?: number
  setStrokeWidth?: (value: number) => void
}

export default function StrokeWidth({ strokeWidth, setStrokeWidth }: StrokeWidthProps) {
  return (
    <Stack spacing={1.5}>
      <Typography variant='subtitle2'>Stroke Width</Typography>
      <Stack direction='row' spacing={2}>
        <Input
          fullWidth
          value={strokeWidth}
          onChange={e => setStrokeWidth && setStrokeWidth(Number(e.target.value))}
          inputProps={{
            min: 1,
            type: 'number'
          }}
        />
      </Stack>
    </Stack>
  )
}
