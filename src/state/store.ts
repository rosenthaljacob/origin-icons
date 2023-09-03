import { configureStore } from '@reduxjs/toolkit'
import toolbarReducer, { ToolbarState } from './toolbarSlice'
import canvasReducer, { CanvasState } from './canvasSlice'

export interface RootState {
  toolbar: ToolbarState
  canvas: CanvasState
}

export const reduxStore = configureStore({
  reducer: {
    toolbar: toolbarReducer,
    canvas: canvasReducer
  }
})
