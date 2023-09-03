import { configureStore } from '@reduxjs/toolkit'
import toolbarReducer, { ToolbarState } from './toolbarSlice'

export interface RootState {
  toolbar: ToolbarState
}

export const reduxStore = configureStore({
  reducer: {
    toolbar: toolbarReducer
  }
})
