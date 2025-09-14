import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';


// WILL REMOVE THEM 
import themeReducer  from '../features/ThemeSlice';
import collapsedReducer from "../features/CollapsedSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,


        theme: themeReducer,
        collapsed: collapsedReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware)
});