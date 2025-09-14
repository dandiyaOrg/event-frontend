import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    adminId: localStorage.getItem('adminId'),
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setSession: (state, action) => {
            state.adminId = action.payload; 
        },

        setCredentials: (state, action) => {
            const { accessToken, refreshToken, adminId } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.adminId = adminId;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('adminId', adminId);
        },

        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.adminId = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('adminId');
        }
    }
})

export const { setSession, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;