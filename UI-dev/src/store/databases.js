import {createSlice} from "@reduxjs/toolkit";


const DatabasesSlice = createSlice({
  name: "databases",
  initialState: {
    server: '',
    current: '',
    tableList: {}
  },
  reducers: {
    loaded: (databases, action) => {
        //TODO MODIFY WHEN THE TIME COMES!
        databases.server  = action.payload.connectedTo.server;
        databases.current = action.payload.connectedTo.database;
        databases.tableList[databases.current] = action.payload.queryResult;
    },

    //If there was a query the server marks that modified the current db schema
    //This should remove all the schema cache from the store
    schemaModified: (databases, action) => {
      if(action.payload.triggerReferesh === 1){
        databases.tableList[databases.current] = action.payload.tables;
      }
    }
  }
});

export default DatabasesSlice.reducer;
export const DatabasesActions = {...DatabasesSlice.actions};