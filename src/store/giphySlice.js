import { createSlice } from '@reduxjs/toolkit';

import GiphyAPI from '../services/API/GiphyAPI';

export const giphySlice = createSlice({
  name: 'giphy',
  initialState: {
    gifsLoading: false,

    gifs: [],
    pickedGif: null,
  },
  reducers: {
    setGifsLoading: (state, action) => {
      state.gifsLoading = action.payload;
    },
    setGifs: (state, action) => {
      state.gifs = action.payload;
    },
    pickGif: (state, action) => {
      state.pickedGif = action.payload;
    },
  },
});

export const { setGifsLoading, setGifs, pickGif } = giphySlice.actions;

export const findGifs = (term) => async (dispatch) => {
  try {
    dispatch(setGifsLoading(true));
    dispatch(setGifs([]));

    const {
      data: { data: gifs },
    } = await GiphyAPI.findGifs(term);

    dispatch(setGifs(gifs));
  } catch (error) {
    dispatch(setGifs([]));
  } finally {
    dispatch(setGifsLoading(false));
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGifs = (state) => state.giphy.gifs;

export const selectGifsLoading = (state) => state.giphy.gifsLoading;

export default giphySlice.reducer;
