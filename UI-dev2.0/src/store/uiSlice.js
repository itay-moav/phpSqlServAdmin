import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menuTables:{},
  menuSchema :[]
};

const UI = createSlice({
  name: "ui",
  initialState,
  reducers: {},

  //handlers/reducers for the fetchservers Thunk
  extraReducers(builder) {
    builder
    
      /**
       * 
       */
      .addCase('tree/fetchDatabaseTables/fulfilled', (state, {payload}) => {
        console.log('LOADED',payload);
        const tableList = payload.queryResult;
        state.menuTables = {};
        state.menuSchema = [];
        
        if(Array.isArray(tableList)){
            tableList.forEach(table=>{
                if(! state.menuTables[table.TABLE_SCHEMA]){
                  state.menuTables[table.TABLE_SCHEMA] = [];
                  state.menuSchema.push(table.TABLE_SCHEMA);
                }
                const {TABLE_NAME,TABLE_TYPE} = table;
                state.menuTables[table.TABLE_SCHEMA].push({tName:TABLE_NAME,tType:TABLE_TYPE});
            });
        }
        console.log('MENU TABLES NEW STATE',state.menuTables);
      })

      // after each query the user runs
      // If the server tells the UI the schema of the server has changed
      // I am deleting the menu item and re populating them
      .addCase('query/run/fulfilled', (state, {payload}) => {
        console.log('Query ui',payload);
        if(payload.triggerRefresh !== 1) {
          return state;
        }
        
        const tableList = payload.tables;
        state.menuTables = {};
        state.menuSchema = [];
        
        if(Array.isArray(tableList)){
            tableList.forEach(table=>{
                if(! state.menuTables[table.TABLE_SCHEMA]){
                  state.menuTables[table.TABLE_SCHEMA] = [];
                  state.menuSchema.push(table.TABLE_SCHEMA);
                }
                const {TABLE_NAME,TABLE_TYPE} = table;
                state.menuTables[table.TABLE_SCHEMA].push({tName:TABLE_NAME,tType:TABLE_TYPE});
            });
        }
        console.log('QUERY RUN: MENU TABLES NEW STATE',state.menuTables);
      })
      
  }


});

export default UI.reducer;
export const UIActions = {...UI.actions};
