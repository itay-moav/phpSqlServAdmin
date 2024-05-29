import { configureStore,combineReducers } from '@reduxjs/toolkit';
import DbTreeReducer from './dbTreeSlice';
import QueryReducer from './querySlice';
import UIReducer from './uiSlice';

const reducer = combineReducers({
  dbTree: DbTreeReducer,
  query: QueryReducer,
  ui: UIReducer
});

export const store = configureStore({
  reducer
});
