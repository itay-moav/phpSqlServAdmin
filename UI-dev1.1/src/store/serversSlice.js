import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { LoadStatus } from "../services/enums";
import http from "../services/http";

// ---------------------------------------------------------------- API --------------------------------------------------------------

export const fetchServers = createAsyncThunk('servers/fetchservers', async () => {
    const response = await http.get('/servers/available');
    return response.data.payload;
})

// ---------------------------------------------------------------- EOF API ----------------------------------------------------------




const initialState = {
    loadStatus: LoadStatus.IDLE,
    error: '',
    databaseList: {} //server:[databases]
};

/**
 * SLICE
 */
const ServersSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    loaded: (state, action) => {
        //TODO MODIFY WHEN THE TIME COMES! 
        state.databaseList = action.payload.servers; //server:[databases]
        if(action.payload.currentServer.length > 0){//in case there is only one server to connect to in the config
            state.currentServer = action.payload.currentServer;
            state.connectionName = action.payload.connectionName;
        }
    },
    serverSelected: (state,action) => {
        state.currentServer  = action.payload.selectedServer;
    }
  },
  //handlers/reducers for the fetchservers Thunk
  extraReducers(builder) {
    builder
      .addCase(fetchServers.pending, (state) => {
        state.loadStatus = LoadStatus.LOADING
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.loadStatus = LoadStatus.SUCCEEDED
        state.currentServer = action.payload.currentServer;
        state.databaseList = action.payload.servers;
      })
      .addCase(fetchServers.rejected, (state, action) => {
        state.status = LoadStatus.FAILED;
        state.error = action.error.message;
      })
  }
});

export default ServersSlice.reducer;
export const ServersActions = {...ServersSlice.actions};
