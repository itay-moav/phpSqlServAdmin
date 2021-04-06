
import {configureStore,getDefaultMiddleware,combineReducers} from "@reduxjs/toolkit";
import databasesReducer from "./databases";
import UIReducer from "./ui";
import QueryReducer from "./query";
import api from "./middleware/api";


const reducer = combineReducers({
  databases: databasesReducer,
  ui: UIReducer,
  query: QueryReducer
});

export default function confStore(){
    return configureStore({
        reducer,
        middleware: [
          ...getDefaultMiddleware(),
          api
        ]
    });
}