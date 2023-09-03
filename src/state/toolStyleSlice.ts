import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToolStyleState {
  draw: {
    strokeWidth: number
    lineCap: string
    strokeDasharray: string
    stroke: string
    fill: string
  }
}

type DrawProperty = 'strokeWidth' | 'lineCap' | 'strokeDasharray' | 'stroke' | 'fill'

type ToolStyleReducer = PayloadAction<{
  property: DrawProperty
  value: string | number
}>

const initialState: ToolStyleState = {
  draw: {
    strokeWidth: 5,
    lineCap: 'round',
    strokeDasharray: 'none',
    stroke: '#22194D',
    fill: 'none'
  }
}

const canvasSlice = createSlice({
  name: 'toolStyle',
  initialState,
  reducers: {
    SET_TOOL_STYLE_ITEM: (state, action: ToolStyleReducer) => {
      const { property, value } = action.payload

      if (property === 'strokeWidth' && typeof value === 'number') {
        state.draw.strokeWidth = value
      } else if (property !== 'strokeWidth' && typeof value === 'string') {
        state.draw[property] = value
      }
    }
  }
})

export const { SET_TOOL_STYLE_ITEM } = canvasSlice.actions
export default canvasSlice.reducer
