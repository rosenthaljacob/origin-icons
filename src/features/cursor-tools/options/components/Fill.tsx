import React, { useState, ChangeEvent, FC } from 'react'
import { ChromePicker } from 'react-color'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

interface FillOptionProps {
  fillColor?: string | null
  setFillColor?: (color: string) => void
}

export default function FillOption({ fillColor, setFillColor }: FillOptionProps) {
  const [fillOption, setFillOption] = useState<'none' | 'color'>(fillColor ? 'color' : 'none')

  const handleFillChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'none' | 'color'
    setFillOption(value)
    if (value === 'none') {
      setFillColor?.('none')
    }
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Fill</FormLabel>
      <RadioGroup value={fillOption} onChange={handleFillChange}>
        <FormControlLabel value='none' control={<Radio />} label='None' />
        <FormControlLabel value='color' control={<Radio />} label='Color' />
      </RadioGroup>
      {fillOption === 'color' && (
        <ChromePicker color={fillColor ?? undefined} onChangeComplete={color => setFillColor?.(color.hex)} />
      )}
    </FormControl>
  )
}
