import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newreleases: null,
  new: null,
  commingsoon: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.newreleases = action.payload.newreleases;
      state.new = action.payload.new;
      state.commingsoon = action.payload.commingsoon;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectNewreleases = (state) => state.movie.newreleases;
export const selectNew = (state) => state.movie.new;
export const selectCommingsoon = (state) => state.movie.commingsoon;

export default movieSlice.reducer;
