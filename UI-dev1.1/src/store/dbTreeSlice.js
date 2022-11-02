import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { LoadStatus } from "../services/enums";
import http from "../services/http";
import {ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME} from "../services/CONSTANTS";


// ---------------------------------------------------------------- API --------------------------------------------------------------
//fetches list of available server connections from environment file
export const fetchServers = createAsyncThunk('tree/fetchservers', async () => {
    const {data} = await http.get('/servers/available');
    return data.payload;
});

//for server level connection, fetches the list of available databases for this connection
export const fetchDatabases = createAsyncThunk('tree/fetchserverDatabases', async ({connectionName,currentServer}) => {
  const {data} = await http.get(`/servers/databases/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}`);
  data.payload.currentServer = currentServer;
  return data.payload;
});

//for server level connection, fetches the list of available databases for this connection
export const loadDatabaseTables = createAsyncThunk('tree/fetchDatabaseTables', async ({connectionName,server,database}) => {
  const {data} = await http.get(`/database/tables/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}`);
  data.payload.currentServer = server;
  data.payload.currentDatabse = database;
  return data.payload;
});

// ---------------------------------------------------------------- EOF API ----------------------------------------------------------



// ---------------------------------------------------------------- SELECTORS --------------------------------------------------------

export const findConnectionNameByServer = serverName => {
  return (state) => {
    return state.dbTree.tree[serverName][ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME];
  }
}

export const findConnectionNameByDbOrServer = (serverName,dbName) => {
  return (state) => {
    return state.dbTree.tree[serverName]['databases'][dbName][ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME] || findConnectionNameByServer(serverName)(state);
  }
}

export const fetchTableList = (serverName,dbName) => {
  if(!serverName || !dbName){
    return ()=>[];
  }
  
  return state => {
    const tbList = state.dbTree.tree[serverName]['databases'][dbName]['tables'] || [];
    if(!Array.isArray(tbList)){
      return ()=>[];
    }
    return tbList;
  }
}

// ---------------------------------------------------------------- EOF SELECTORS ----------------------------------------------------


const initialState = {
    serversLoadStatus: LoadStatus.IDLE,
    databasesLoadStatus: LoadStatus.IDLE,
    schemaTablesLoadStatus: LoadStatus.IDLE,
    error: '',
    tree: {} //[server|connectionName]["databases"][database|connectionName][schema][table]
};

/**
 * SLICE
 */
const DbTreeSlice = createSlice({
  name: "dbTree",
  initialState,
  reducers: {},
  //handlers/reducers for the fetchservers Thunk
  extraReducers(builder) {
    builder
      /**
       * server tree
       */
      .addCase(fetchServers.pending, (state) => {
        state.serversLoadStatus = LoadStatus.LOADING
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.serversLoadStatus = LoadStatus.SUCCEEDED
        state.tree = action.payload.servers;
      })
      .addCase(fetchServers.rejected, (state, action) => {
        state.serversLoadStatus = LoadStatus.FAILED;
        state.error = action.error.message;
      })

      /**
       * single server database tree
       */
      .addCase(fetchDatabases.pending, (state) => {
        state.databasesLoadStatus = LoadStatus.LOADING
      })
      .addCase(fetchDatabases.fulfilled, (state, {payload}) => {
        state.databasesLoadStatus = LoadStatus.SUCCEEDED
        state.tree[payload.currentServer].databases = {};
        payload.queryResult.forEach(element => {
          state.tree[payload.currentServer].databases[element.name] = {
                                                                       database:element.name,
                                                                       tables:{}
                                                                      };
        });
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.databasesLoadStatus = LoadStatus.FAILED;
        state.error = action.error.message;
      })

      /**
       * 
       */
      .addCase(loadDatabaseTables.fulfilled, (state, {payload}) => {
        state.tree[payload.currentServer].databases[payload.currentDatabse].tables = payload.queryResult;
      })
  }
});

export default DbTreeSlice.reducer;
export const DbTreeActions = {...DbTreeSlice.actions};
