import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToolStyleState {
  draw: {
    strokeWidth: number
    lineCap: string
    strokeDasharray: string
    stroke: string
    fill: string
  }
  shape: {
    strokeWidth: number
    strokeDasharray: string
    stroke: string
    fill: string
  }
  line: {
    strokeWidth: number
    strokeDasharray: string
    stroke: string
  }
}

type DrawProperty = 'strokeWidth' | 'lineCap' | 'strokeDasharray' | 'stroke' | 'fill'
type ShapeProperty = 'strokeWidth' | 'strokeDasharray' | 'stroke' | 'fill'
type LineProperty = 'strokeWidth' | 'strokeDasharray' | 'stroke'

type ToolStyleReducer<PropertyNames> = PayloadAction<{
  property: PropertyNames
  value: string | number
}>

const initialState: ToolStyleState = {
  draw: {
    strokeWidth: 5,
    lineCap: 'round',
    strokeDasharray: 'none',
    stroke: '#22194D',
    fill: 'none'
  },
  shape: {
    strokeWidth: 5,
    strokeDasharray: 'none',
    stroke: '#22194D',
    fill: 'none'
  },
  line: {
    strokeWidth: 5,
    strokeDasharray: 'none',
    stroke: '#22194D'
  }
}

const canvasSlice = createSlice({
  name: 'toolStyle',
  initialState,
  reducers: {
    SET_DRAW_STYLE_ITEM: (state, action: ToolStyleReducer<DrawProperty>) => {
      const { property, value } = action.payload

      if (property === 'strokeWidth' && typeof value === 'number') {
        state.draw.strokeWidth = value
      } else if (property !== 'strokeWidth' && typeof value === 'string') {
        state.draw[property] = value
      }
    },
    SET_SHAPE_STYLE_ITEM: (state, action: ToolStyleReducer<ShapeProperty>) => {
      const { property, value } = action.payload

      if (property === 'strokeWidth' && typeof value === 'number') {
        state.shape.strokeWidth = value
      } else if (property !== 'strokeWidth' && typeof value === 'string') {
        state.shape[property] = value
      }
    },
    SET_LINE_STYLE_ITEM: (state, action: ToolStyleReducer<LineProperty>) => {
      const { property, value } = action.payload

      if (property === 'strokeWidth' && typeof value === 'number') {
        state.line.strokeWidth = value
      } else if (property !== 'strokeWidth' && typeof value === 'string') {
        state.line[property] = value
      }
    }
  }
})

export const { SET_DRAW_STYLE_ITEM, SET_LINE_STYLE_ITEM, SET_SHAPE_STYLE_ITEM } = canvasSlice.actions
export default canvasSlice.reducer
