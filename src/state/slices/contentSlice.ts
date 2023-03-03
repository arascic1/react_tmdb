import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export const APIkey = '81f7c3bbaaf367b164d04c5fb28e6101'

type Content = {
  title: string
  backdrop_path: string
  id: number
}

type ContentState = {
  loading: boolean
  data: Content[]
  error: string,
}

const initialState: ContentState = {
  loading: false,
  data: [],
  error: ''
}

export const searchMovies = createAsyncThunk('content/searchMovies', async (url: string) => {
  return axios.get(url).then(response => 
      response.data.results.filter((e: any) => 
        e.backdrop_path != null
      )
    .slice(0, 10)
  )
})

export const searchTV = createAsyncThunk('content/searchTV', async (url: string) => {
  const response = await axios.get(url).then(response => 
    response.data.results.filter((e: any) => e.backdrop_path != null)
  )

  return response.map((e: any) => ({
    title: e.name,
    backdrop_path: e.backdrop_path,
    id: e.id
  })).slice(0, 10)
}) 

export const fetchTopTVShows = createAsyncThunk('content/fetchTopTVShows', async () => {
  const response = await axios
    .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIkey}&language=en-US&page=1`)
 
  return response.data.results.map((e: any) => ({
    title: e.name,
    backdrop_path: e.backdrop_path,
    id: e.id
  })).slice(0, 10)
})

export const fetchTopMovies = createAsyncThunk('content/fetchTopMovies', async () => {
  const res = await axios
    .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`)
  return res.data.results.slice(0, 10)
})

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder.addCase(
      searchTV.fulfilled, 
      (state, action: PayloadAction<Content[]>) => {
        state.loading = false
        state.data = action.payload,
        state.error = ''
      }
    )

    builder.addCase(
      fetchTopTVShows.fulfilled, 
      (state, action: PayloadAction<Content[]>) => {
        state.loading = false
        state.data = action.payload,
        state.error = ''
      }
    )

    builder.addCase(
      fetchTopMovies.fulfilled,
      (state, action: PayloadAction<Content[]>) => {
        state.loading = false,
        state.data = action.payload,
        state.error = ''
      }
    )

    builder.addCase(
      searchMovies.fulfilled,
      (state, action: PayloadAction<Content[]>) => {
        state.loading = false,
        state.data = action.payload,
        state.error = ''
      }
    )

    builder.addCase(fetchTopTVShows.rejected, (state, action) => {
      state.loading = false,
      state.data = [],
      state.error = action.error.message || 'Something went wrong'
    })

    builder.addCase(fetchTopMovies.rejected, (state, action) => {
      state.loading = false,
      state.data = [],
      state.error = action.error.message || 'Something went wrong'
    })
  }

})

export default contentSlice.reducer