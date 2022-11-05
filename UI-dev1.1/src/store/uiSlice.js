import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menuTables:{},
  menuSchema :[]
};

const UI = createSlice({
  name: "ui",
  initialState,
  reducers: {

/*

    selectedTable: (uiState,action) => {
      if(!action.payload) return uiState;
      uiState.currentTable = action.payload;
    },
    resetTableUI:  (uiState,action) => {
      uiState.currentTable = null;
    },
    dbMenuSelectedTableOwnersOpened: (uiState,action) => {
      if(uiState.dbMenuSelectedTableOwners.indexOf(action.payload) === -1){
        uiState.dbMenuSelectedTableOwners.push(action.payload);
      }
    },
    dbMenuSelectedTableOwnersClosed: (uiState,action) => {
      const idx = uiState.dbMenuSelectedTableOwners.indexOf(action.payload);
      if(idx !== -1){
        uiState.dbMenuSelectedTableOwners.splice(idx,1);
      }
    },

    */
  },





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
      
  }


});

export default UI.reducer;
export const UIActions = {...UI.actions};
