import {createSlice} from "@reduxjs/toolkit";


const UI = createSlice({
  name: "ui",
  initialState: {
    rightPanel:'query'
  },
  reducers: {
    wantQuery: (stateOfTheUI, action) => {
        stateOfTheUI.rightPanel = 'query';
    },

    wantTableFields: (stateOfTheUI, action) => {
        stateOfTheUI.rightPanel = 'tableFields';
    },

    wantTableContent: (stateOfTheUI, action) => {
        stateOfTheUI.rightPanel = 'queryResults';
    },

    wantQueryResults: (stateOfTheUI, action) => {
        stateOfTheUI.rightPanel = 'queryResults';
    }
  }
});

export default UI.reducer;
export const UIActions = {...UI.actions};