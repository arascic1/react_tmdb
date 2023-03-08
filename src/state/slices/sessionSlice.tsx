import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type AppState = {
  type: string,
  query: string
}

const initialState: AppState = {
  type: '',
  query: ''
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    }
  }
})

export default sessionSlice.reducer
export const { setType, setQuery } = sessionSlice.actions