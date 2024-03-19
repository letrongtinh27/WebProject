import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  new: null,
  commingsoon: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.new = action.payload.new;
      state.commingsoon = action.payload.commingsoon;

      console.log(state.recommend);
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNew = (state) => state.movie.new;
export const selectCommingsoon = (state) => state.movie.commingsoon;

export default movieSlice.reducer;
