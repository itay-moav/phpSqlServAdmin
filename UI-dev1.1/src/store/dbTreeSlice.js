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
    serversLoadStatus: LoadStatus.IDLE,
    databasesLoadStatus: LoadStatus.IDLE,
    schemaTablesLoadStatus: LoadStatus.IDLE,
    error: '',
    tree: {} //[server][database|connectionName][schema][table]
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
      .addCase(fetchServers.pending, (state) => {
        state.serversLoadStatus = LoadStatus.LOADING
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.serversLoadStatus = LoadStatus.SUCCEEDED
        state.tree = action.payload.servers;
      })
      .addCase(fetchServers.rejected, (state, action) => {
        state.status = LoadStatus.FAILED;
        state.error = action.error.message;
      })
  }
});

export default DbTreeSlice.reducer;
export const DbTreeActions = {...DbTreeSlice.actions};
