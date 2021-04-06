import {createSlice} from "@reduxjs/toolkit";


const Query = createSlice({
  name: "query",
  initialState: {
    lastQuery:'',
    lastResults: [],
    lastError: '',
    lastPage:0,
    pageSize:500
  },
  reducers: {
    queryRan: (query, action) => {
        query.lastQuery = action.payload.query;
        return query;
    },

    resultsLoaded: (query, action) => {
        query.lastError='';
        if(action.payload.queryResult ==='error'){
          query.lastResults = [];
          query.lastError = action.payload.error;
        } else {
          query.lastResults = action.payload.queryResult;
        }
        return query;
    }
  }
});

export default Query.reducer;
export const QueryActions = {...Query.actions};