import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

interface LineStyleProps {
  strokeDasharray?: string
  setStrokeDasharray?: (value: string) => void
}

export default function StrokeDashArray({ strokeDasharray, setStrokeDasharray }: LineStyleProps) {
  const [lineStyle, setLineStyle] = useState('none')
  const [dashLength, setDashLength] = useState(5)
  const [gapLength, setGapLength] = useState(5)

  useEffect(() => {
    if (strokeDasharray === 'none' || !strokeDasharray) {
      setLineStyle('none')
    } else {
      const [dash, gap] = strokeDasharray.split(',').map(Number)
      setDashLength(dash)
      setGapLength(gap)
      setLineStyle('dashed')
    }
  }, [strokeDasharray])

  const handleLineStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLineStyle(value)
    if (value === 'none') {
      setStrokeDasharray?.('none')
    } else {
      setStrokeDasharray?.(`${dashLength},${gapLength}`)
    }
  }

  const handleDashGapChange = () => {
    if (lineStyle === 'dashed') {
      setStrokeDasharray?.(`${dashLength},${gapLength}`)
    }
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Line Style</FormLabel>
      <RadioGroup aria-label='line style' name='line-style' value={lineStyle} onChange={handleLineStyleChange}>
        <FormControlLabel value='none' control={<Radio />} label='None' />
        <FormControlLabel value='dashed' control={<Radio />} label='Dashed' />
      </RadioGroup>

      {lineStyle === 'dashed' && (
        <div>
          <TextField
            label='Dash Length'
            type='number'
            value={dashLength}
            onChange={e => {
              setDashLength(Number(e.target.value))
              handleDashGapChange()
            }}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label='Gap Length'
            type='number'
            value={gapLength}
            onChange={e => {
              setGapLength(Number(e.target.value))
              handleDashGapChange()
            }}
          />
        </div>
      )}
    </FormControl>
  )
}
