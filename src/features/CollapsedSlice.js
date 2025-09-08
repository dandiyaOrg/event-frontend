// src/redux/CollapsedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
};

const collapsedSlice = createSlice({
  name: "collapsed",
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapse(state, action) {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleCollapse, setCollapse } = collapsedSlice.actions;
export default collapsedSlice.reducer;
