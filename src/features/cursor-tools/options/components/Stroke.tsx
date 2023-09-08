import React, { useState, ChangeEvent, FC } from 'react'
import { ChromePicker } from 'react-color'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

interface StrokeOptionProps {
  strokeColor?: string | null
  setStrokeColor?: (color: string) => void
}

export default function StrokeOption({ strokeColor, setStrokeColor }: StrokeOptionProps) {
  const [strokeOption, setStrokeOption] = useState<'none' | 'color'>('none')

  const handleStrokeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'none' | 'color'
    setStrokeOption(value)
    if (value === 'none') {
      setStrokeColor?.('none')
    }
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Stroke</FormLabel>
      <RadioGroup value={strokeOption} onChange={handleStrokeChange}>
        <FormControlLabel value='none' control={<Radio />} label='None' />
        <FormControlLabel value='color' control={<Radio />} label='Color' />
      </RadioGroup>
      {strokeOption === 'color' && (
        <ChromePicker color={strokeColor ?? undefined} onChangeComplete={color => setStrokeColor?.(color.hex)} />
      )}
    </FormControl>
  )
}
