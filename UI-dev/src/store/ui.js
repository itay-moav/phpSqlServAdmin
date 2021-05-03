import {createSlice} from "@reduxjs/toolkit";


const UI = createSlice({
  name: "ui",
  initialState: {
    dbMenuSelectedTableOwners:[],
    currentTable: null
  },
  reducers: {
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
  }
});

export default UI.reducer;
export const UIActions = {...UI.actions};