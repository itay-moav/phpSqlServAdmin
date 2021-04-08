import {createSlice} from "@reduxjs/toolkit";


const DatabasesSlice = createSlice({
  name: "databases",
  initialState: {
    current: '',
    list: {}
  },
  reducers: {
    loaded: (databases, action) => {
        //TODO MODIFY WHEN THE TIME COMES!
        databases.server  = action.payload.connectedTo.server;
        databases.current = action.payload.connectedTo.database;
        databases.tableList ={};
        databases.tableList[databases.current] = action.payload.queryResult;
    }
  }
});

export default DatabasesSlice.reducer;
export const DatabasesActions = {...DatabasesSlice.actions};