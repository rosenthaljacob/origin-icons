import React from 'react'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface LineCapProps {
  lineCap?: string
  setLineCap?: (value: string) => void
}

export default function LineCap({ lineCap, setLineCap }: LineCapProps) {
  return (
    <Stack spacing={1.5}>
      <Typography variant='subtitle2'>Line Cap</Typography>
      <Stack direction='row' spacing={2}>
        <Select fullWidth value={lineCap} onChange={e => setLineCap && setLineCap(e.target.value)}>
          <MenuItem value={'butt'}>Butt</MenuItem>
          <MenuItem value={'round'}>Round</MenuItem>
          <MenuItem value={'square'}>Square</MenuItem>
        </Select>
      </Stack>
    </Stack>
  )
}
