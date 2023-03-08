import { configureStore } from "@reduxjs/toolkit";
import contentReducer from './slices/contentSlice'
import sessionReducer from './slices/sessionSlice'

const store = configureStore({
  reducer: {
    content: contentReducer,
    session: sessionReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch