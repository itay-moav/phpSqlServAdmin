import {createSlice} from "@reduxjs/toolkit";


const ServersSlice = createSlice({
  name: "servers",
  initialState: {
    currentServer: '',
    connectionName: '',
    databaseList: {} //server:[databases]
  },
  reducers: {
    loaded: (servers, action) => {
        //TODO MODIFY WHEN THE TIME COMES! 
        servers.databaseList = action.payload.servers; //server:[databases]
        if(action.payload.currentServer.length > 0){//in case there is only one server to connect to in the config
           servers.currentServer = action.payload.currentServer;
           servers.connectionName = action.payload.connectionName;
        }
    },
    serverSelected: (servers,action) => {
        servers.currentServer  = action.payload.selectedServer;
    }
  }
});

export default ServersSlice.reducer;
export const ServersActions = {...ServersSlice.actions};