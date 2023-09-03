import { configureStore } from '@reduxjs/toolkit'
import toolbarReducer, { ToolbarState } from './toolbarSlice'
import toolStyleReducer, { ToolStyleState } from './toolStyleSlice'

export interface RootState {
  toolbar: ToolbarState
  toolStyle: ToolStyleState
}

export const reduxStore = configureStore({
  reducer: {
    toolbar: toolbarReducer,
    toolStyle: toolStyleReducer
  }
})
