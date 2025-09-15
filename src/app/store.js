import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi'; 
import themeReducer  from '../features/UI/ThemeSlice';
import collapsedReducer from "../features/UI/CollapsedSlice";
import { apiSlice } from '../features/apiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,


        theme: themeReducer,
        collapsed: collapsedReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(apiSlice.middleware)
});