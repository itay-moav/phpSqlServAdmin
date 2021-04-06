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
        databases.current = 'emerald_amwell';
        databases.list = {emerald_amwell: action.payload.queryResult};
        //return databases;
    }
  }
});

export default DatabasesSlice.reducer;
export const DatabasesActions = {...DatabasesSlice.actions};