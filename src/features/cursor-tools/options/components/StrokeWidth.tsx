import React from 'react'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'

export default function StrokeWidth() {
  return (
    <Stack direction='row' spacing={2}>
      <Input
        sx={{ width: 42 }}
        value={20}
        margin='dense'
        onChange={() => {}}
        inputProps={{
          step: 10,
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider'
        }}
      />
      <Slider aria-label='Small' defaultValue={20} valueLabelDisplay='auto' step={10} marks min={0} max={100} />
    </Stack>
  )
}
