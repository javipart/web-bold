import reducerMix from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: reducerMix,
});

export default store;
