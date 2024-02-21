import { configureStore } from '@reduxjs/toolkit'
import User from './slice/UserSlice'
import Tool from './slice/ToolSlice'

export const store =  configureStore({
  reducer: {
    User:User,
    Tool:Tool
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch