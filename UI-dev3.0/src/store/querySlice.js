import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { LoadStatus } from "../services/enums";
import http from "../services/http";
import {ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME} from "../services/CONSTANTS";


// ---------------------------------------------------------------- API --------------------------------------------------------------

/**
 * Makes it to either call the predefined queries api call or the regular query run
 * 
 * @param {string} connectionName 
 * @param {string} database 
 * @param {string} query 
 * @param {*} queryParams 
 * @returns 
 */
function helperApiCallBuilder(connectionName,database,query,queryParams){
  let url = `/query/predefined/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}/queryName/${query}`;
  let apiCallParams =  {params:{queryParams}};
  if(query.indexOf(' ') >= 0){
    url = `/query/run/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}`;
    apiCallParams =  {params:{query}};
  }

  return {url,apiCallParams};
}

/**
 * Dispatches a query to the server
 */
export const runQuery = createAsyncThunk('query/run', async ({connectionName,server,database,query,queryParams=[]}) => {
  if(!connectionName){
    console.error('No conncetionname was found in runQuery');
    return {};
  }
  console.log('ABOUT TO RUN:',connectionName,database,query,queryParams);
  const apiCall = helperApiCallBuilder(connectionName,database,query,queryParams);
  const {data} = await http.post(apiCall.url,apiCall.apiCallParams);
  data.payload.currentServer = server;
  data.payload.currentDatabse = database;
  return data.payload;
});

/**
 * Dispatches a query to the server without updating the query editors UI of this query
 */
export const runQuerySilent = createAsyncThunk('query/runSilent', async ({connectionName,server,database,query,queryParams=[]}) => {
  if(!connectionName){
    console.error('No conncetionname was found in runQuerySilent');
    return {};
  }
  console.log('ABOUT TO SILENT RUN:',connectionName,database,query,queryParams);
  const apiCall = helperApiCallBuilder(connectionName,database,query,queryParams);
  const {data} = await http.post(apiCall.url,apiCall.apiCallParams);
  data.payload.currentServer = server;
  data.payload.currentDatabse = database;
  return data.payload;
});

// ---------------------------------------------------------------- EOF API ----------------------------------------------------------


// -------------------------------------------------------------  SELECTORS ----------------------------------------------------------

export const getSilentQueryResults = () => {
  return (state) => {
    return state.query.silentResults;
  }
}


// ----------------------------------------------------------- EOF SELECTORS ---------------------------------------------------------



const initialState = {
  queryStatus: LoadStatus.IDLE,
  lastQuery:'',
  lastResults: [],
  lastError: '',
  lastPage:0,
  pageSize:500,
  silentResults: []
};

const Query = createSlice({
  name: "query",
  initialState,
  reducers: {
    manualSetLastQuery: (state,action) => {//To manually insert text into the last query box, like last file name uploaded
      state.lastQuery = action.payload;
    },
    reset: ()=>{
      return initialState;
    }

  },
  //handlers/reducers for the query Thunk
  extraReducers(builder) {
    builder
      .addCase(runQuery.pending, (state) => {
        state.queryStatus = LoadStatus.LOADING
      })
      .addCase(runQuery.fulfilled, (state, action) => {
        state.queryStatus = LoadStatus.SUCCEEDED;
        state.lastQuery = action.payload.query;
        if(action.payload.queryResult ==='error'){
          state.lastResults = [];
          state.lastError = action.payload.error;
        } else {
          state.lastResults = action.payload.queryResult;
          state.lastError = '';
        }
      })
      .addCase(runQuery.rejected, (state, action) => {
        state.queryStatus = LoadStatus.FAILED;
        state.lastError='';
        if(action.payload.queryResult ==='error'){
          state.lastResults = [];
          state.lastError = action.payload.error;
        } else {
          state.lastResults = action.payload.queryResult;
        }
      })
      .addCase(runQuerySilent.fulfilled, (state, action) => {
        if(action.payload.queryResult ==='error'){
          state.silentResults = [];
          state.lastError = action.payload.error;
        } else {
          state.silentResults = action.payload.queryResult;
        }
      })
  }
});

export default Query.reducer;
export const QueryActions = {...Query.actions};
