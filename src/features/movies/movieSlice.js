import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {

    const response = await movieApi.get(
      `?t=&apiKey=${APIKey}&s=${term}&type=movie`
    );
        return response.data
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {

    const response = await movieApi.get(
      `?t=&apiKey=${APIKey}&s=${term}&type=series`
    );
        return response.data
  }
);
export const fetchAsyncMovieOrShow = createAsyncThunk(
  "movies/fetchAsyncMovieOrShow",
  async (id) => {
    console.log(id);
    const response = await movieApi.get(
      `?apiKey=${APIKey}&i=${id}&Plot=full`
    );
        return response.data
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    },
  },
  extraReducers: {
      [fetchAsyncMovies.pending]: () => {
          console.log('pending');
      },
      [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
        console.log('Fetched');
        return {...state, movies: payload}
      },
      [fetchAsyncMovies.rejected]: () => {
        console.log('Rejected');
      },
      [fetchAsyncShows.fulfilled]: (state, {payload}) => {
        console.log('Fetched');
        return {...state, shows: payload}
      },
      [fetchAsyncMovieOrShow.fulfilled]: (state, {payload}) => {
        console.log('Fetched');
        return {...state, selectedMovieOrShow: payload}
      },
  }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
export default movieSlice.reducer;
