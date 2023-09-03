import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Pan = { x: number; y: number }

export interface CanvasState {
  pan: Pan
}

const initialState = {
  pan: { x: 0, y: 0 }
}

const canvasSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    SET_PAN: (state, action: PayloadAction<Pan>) => {
      state.pan = action.payload
    }
  }
})

export const { SET_PAN } = canvasSlice.actions
export default canvasSlice.reducer
