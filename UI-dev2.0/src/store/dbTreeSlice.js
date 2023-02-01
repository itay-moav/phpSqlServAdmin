import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { LoadStatus } from "../services/enums";
import http from "../services/http";
import {ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME,URL_PARAMS__DATABASE_NAME,TREE_NODES__DATABASES, TREE_NODES__TABLE_STRUCTURE} from "../services/CONSTANTS";


// ---------------------------------------------------------------- API --------------------------------------------------------------
//fetches list of available server connections from environment file
export const fetchServers = createAsyncThunk('tree/fetchservers', async () => {
    console.log('tree/fetchservers');
    const {data} = await http.get('/servers/available');
    return data.payload;
});

//for server level connection, fetches the list of available databases for this connection
export const loadDatabases = createAsyncThunk('tree/fetchserverDatabases', async ({connectionName,currentServer}) => {
  console.log('tree/fetchserverDatabases for',connectionName);
  if(!connectionName){
    console.error('connection name not found in loadDatabases');
    return {};
  }
  const {data} = await http.get(`/servers/databases/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}`);
  data.payload.currentServer = currentServer;
  return data.payload;
});

//for server level connection, fetches the list of available databases for this connection
export const loadDatabaseTables = createAsyncThunk('tree/fetchDatabaseTables', async ({connectionName,server,database}) => {
  if(!connectionName){
    console.error('connection name not defined in loadDatabaseTables');
    return {};
  }
  const {data} = await http.get(`/database/tables/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}`);
  data.payload.currentServer = server;
  data.payload.currentDatabse = database;
  return data.payload;
});

//Called for each table (lazy) when user has to do some actions on it
export const loadTableStructure = createAsyncThunk('tree/loadTableStructure',async ({connectionName,server,database,schema,table})=>{
  if(!connectionName){
    console.error('connection name not defined in loadTableStructure');
    return {};
  }
  const {data} = await http.get(`/tables/structure/${ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME}/${connectionName}/${URL_PARAMS__DATABASE_NAME}/${database}/schema/${schema}/table/${table}`);

  data.payload.currentServer  = server;
  data.payload.currentDatabse = database;
  data.payload.currentSchema  = schema;
  data.payload.currentTable   = table;
  return data.payload;
})

// ---------------------------------------------------------------- EOF API ----------------------------------------------------------



// ---------------------------------------------------------------- SELECTORS --------------------------------------------------------

export const findConnectionNameByServer = serverName => {
  return (state) => {
    if(!state.dbTree.tree[serverName]){
      return false; //we get here in case a page refresh has happened.
    }
    return state.dbTree.tree[serverName][ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME] || false;
  }
}

//Checks if there is a db in the state, if no -> returns false. If yes, return the connection name on the db level
export const findConnectionNameByServerAndDb = (serverName,dbName) => {
  return (state) => {
    if(!state.dbTree.tree[serverName] || !state.dbTree.tree[serverName][TREE_NODES__DATABASES] || !state.dbTree.tree[serverName][TREE_NODES__DATABASES][dbName]){
      console.error('No connectoion name was found in selector findConnectionNameByServerAndDb ')
      return false;
    }
    return state.dbTree.tree[serverName][TREE_NODES__DATABASES][dbName][ENVIRONMENT__DBCONNECTIONS__CONNECTION_NAME] || findConnectionNameByServer(serverName)(state);
  }
}

//If current server has no databases either previously loaded or from server side config, will signal should try to load them
export const shouldLoadDatabases  = serverName => {
  return state => {
    if(!state.dbTree.tree[serverName]){
      return false;
    }
    const databases = state.dbTree.tree[serverName][TREE_NODES__DATABASES];
    return (Array.isArray(databases) && databases.length === 0)
  }
}

export const fetchTableList = (serverName,dbName) => {
  if(!serverName || !dbName){
    return ()=>[];
  }
  
  return state => {
    const tbList = state.dbTree.tree[serverName][TREE_NODES__DATABASES][dbName]['tables'] || [];
    if(!Array.isArray(tbList)){
      return ()=>[];
    }
    return tbList;
  }
}

export const tableStructure = (serverName,dbName,schema,table) =>{
  return state => {
    const tree = state.dbTree.tree;
    if(!tree[serverName] || 
       !tree[serverName][TREE_NODES__DATABASES][dbName] || 
       !tree[serverName][TREE_NODES__DATABASES][dbName][TREE_NODES__TABLE_STRUCTURE]){
      return false;
    }

    const branch = tree[serverName][TREE_NODES__DATABASES][dbName][TREE_NODES__TABLE_STRUCTURE];
    if(!branch[schema] || !branch[schema][table]){
      return false;
    }
    return branch[schema][table];
  }
}

// ---------------------------------------------------------------- EOF SELECTORS ----------------------------------------------------

const initialState = {
    serversLoadStatus: LoadStatus.IDLE,
    databasesLoadStatus: LoadStatus.IDLE,
    schemaTablesLoadStatus: LoadStatus.IDLE,
    error: '',
    tree: {} //[server | connectionName]["databases"][database | connectionName][schema.table | schemas]
             //                                                                 [table-structure][schema][table name: {columns:[array of columns:{cname,ctype...isPk}],
             //                                                                                                       pk:[f1,f2,f3] ... todo for later}
             //                                                                                                     
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
      .addCase(loadDatabases.pending, (state) => {
        state.databasesLoadStatus = LoadStatus.LOADING
      })
      .addCase(loadDatabases.fulfilled, (state, {payload}) => {
        state.databasesLoadStatus = LoadStatus.SUCCEEDED
        state.tree[payload.currentServer][TREE_NODES__DATABASES] = {};
        payload.queryResult.forEach(element => {
          state.tree[payload.currentServer][TREE_NODES__DATABASES][element.name] = {
                                                                       [TREE_NODES__TABLE_STRUCTURE]:{},
                                                                       database:element.name,
                                                                       tables:{}
                                                                      };
        });
      })
      .addCase(loadDatabases.rejected, (state, action) => {
        state.databasesLoadStatus = LoadStatus.FAILED;
        state.error = action.error.message;
      })

      /**
       * 
       */
      .addCase(loadDatabaseTables.fulfilled, (state, {payload}) => {
        state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse].tables = payload.queryResult;
      })

      /**
       * Loads the structure of a single table, called on [structure] tab, update and insert table actions
       */
      .addCase(loadTableStructure.fulfilled, (state, {payload}) => {
        if(!state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse][TREE_NODES__TABLE_STRUCTURE]){
          state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse][TREE_NODES__TABLE_STRUCTURE]={};
        }

        if(!state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse][TREE_NODES__TABLE_STRUCTURE][payload.currentSchema]){
          state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse][TREE_NODES__TABLE_STRUCTURE][payload.currentSchema]={};
        }
        state.tree[payload.currentServer][TREE_NODES__DATABASES][payload.currentDatabse][TREE_NODES__TABLE_STRUCTURE][payload.currentSchema][payload.currentTable] = payload;
      })
      
      /**
       * 
       */
      .addCase(loadTableStructure.rejected, (state, action) => {
        console.error('loadTableStructure.rejected',action);
        return state;
      })
  }
});

export default DbTreeSlice.reducer;
export const DbTreeActions = {...DbTreeSlice.actions};
