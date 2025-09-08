import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./AuthSlice";
import sidebarReducer from './SidebarSlice';
import themeReducer  from './ThemeSlice';
import collapsedReducer from "./CollapsedSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    collapsed: collapsedReducer,
  },
});
