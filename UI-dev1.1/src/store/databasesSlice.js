import {createSlice} from "@reduxjs/toolkit";
//TOBEDELETED
const initialState = {
  currentDatabase: '',
  tableList: {},
  tablesOwners: {}
};

const DatabasesSlice = createSlice({
  name: "databases",
  initialState,
  reducers: {
    selected: (databases, action) => {
        databases.currentDatabase = action.payload.selectedDatabase;
        databases.tableList[databases.currentDatabase] = action.payload.queryResult;
        databases.tablesOwners[databases.currentDatabase] = action.payload.tablesOwners;
    },

    //If there was a query the server marks that modified the current db schema
    //This should remove all the schema cache from the store
    schemaModified: (databases, action) => {
      if(action.payload.triggerReferesh === 1){
        databases.tableList[databases.currentDatabase] = action.payload.tables;
      }
    }
  }
});

export default DatabasesSlice.reducer;
export const DatabasesActions = {...DatabasesSlice.actions};
