// redux/sidebarSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  isCollapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapse(state, action) {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleCollapse, setCollapse } = sidebarSlice.actions;
export default sidebarSlice.reducer;
