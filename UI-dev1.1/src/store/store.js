import { configureStore,combineReducers } from '@reduxjs/toolkit';
import ServerReducer from './serversSlice';
import DatabasesReducer from "./databasesSlice";
import QueryReducer from './querySlice';
import UIReducer from './uiSlice';

const reducer = combineReducers({
  servers: ServerReducer,
  databases: DatabasesReducer,
  query: QueryReducer,
  ui: UIReducer
});

export const store = configureStore({
  reducer
});
