import { createSlice } from '@reduxjs/toolkit'

export interface ToolbarState {
  zoomPercentage: number
}

const initialState = {
  zoomPercentage: 100
}

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    SET_ZOOM_PERCENTAGE: (state, action) => {
      state.zoomPercentage = action.payload
    }
  }
})

export const { SET_ZOOM_PERCENTAGE } = toolbarSlice.actions
export default toolbarSlice.reducer
