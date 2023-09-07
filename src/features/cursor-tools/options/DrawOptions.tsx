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
import { SET_DRAW_STYLE_ITEM } from 'src/state/toolStyleSlice'

export default function DrawOptions() {
  const dispatch = useDispatch()

  const { draw } = useSelector((state: RootState) => state.toolStyle)

  const handleChange = (property: keyof RootState['toolStyle']['draw']) => (value: string | number) => {
    dispatch(SET_DRAW_STYLE_ITEM({ property, value }))
  }

  return (
    <Stack spacing={2}>
      <StrokeWidth strokeWidth={draw.strokeWidth} setStrokeWidth={handleChange('strokeWidth')} />
      <LineCap setLineCap={handleChange('lineCap')} lineCap={draw.lineCap} />
      <StrokeDashArray setStrokeDasharray={handleChange('strokeDasharray')} strokeDasharray={draw.strokeDasharray} />
      <FillOption setFillColor={handleChange('fill')} fillColor={draw.fill} />
      <StrokeOption setStrokeColor={handleChange('stroke')} strokeColor={draw.stroke} />
    </Stack>
  )
}
