import React from 'react'
// Local Components
import StrokeWidth from './components/StrokeWidth'
import LineCap from './components/LineCap'
import StrokeDashArray from './components/StrokeDashArray'
import FillOption from './components/Fill'
import StrokeOption from './components/Stroke'
// @mui
import Stack from '@mui/material/Stack'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/state/store'
import { SET_LINE_STYLE_ITEM } from 'src/state/toolStyleSlice'

export default function ShapeOptions() {
  const dispatch = useDispatch()

  const { line } = useSelector((state: RootState) => state.toolStyle)

  const handleChange = (property: keyof RootState['toolStyle']['line']) => (value: string | number) => {
    dispatch(SET_LINE_STYLE_ITEM({ property, value }))
  }

  return (
    <Stack spacing={2}>
      <StrokeWidth strokeWidth={line.strokeWidth} setStrokeWidth={handleChange('strokeWidth')} />
      <StrokeDashArray setStrokeDasharray={handleChange('strokeDasharray')} strokeDasharray={line.strokeDasharray} />
      <StrokeOption setStrokeColor={handleChange('stroke')} strokeColor={line.stroke} />
    </Stack>
  )
}
