import { configureStore } from '@reduxjs/toolkit';

import githubReducer from './githubSlice';
import giphyReducer from './giphySlice';

export default configureStore({
  reducer: {
    github: githubReducer,
    giphy: giphyReducer,
  },
});
