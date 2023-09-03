import { createSlice } from '@reduxjs/toolkit'

export interface ToolbarState {
  zoomPercentage: number
  cursorTool: string
}

const initialState = {
  zoomPercentage: 100,
  cursorTool: 'pan'
}

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    SET_ZOOM_PERCENTAGE: (state, action) => {
      state.zoomPercentage = action.payload
    },
    SET_CURSOR_TOOL: (state, action) => {
      state.cursorTool = action.payload
    }
  }
})

export const { SET_ZOOM_PERCENTAGE, SET_CURSOR_TOOL } = toolbarSlice.actions
export default toolbarSlice.reducer
