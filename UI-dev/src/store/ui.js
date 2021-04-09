import {createSlice} from "@reduxjs/toolkit";


const UI = createSlice({
  name: "ui",
  initialState: {
    currentTable: null
  },
  reducers: {
    selectedTable: (uiState,action) => {
      uiState.currentTable = action.payload;
    }
  }
});

export default UI.reducer;
export const UIActions = {...UI.actions};