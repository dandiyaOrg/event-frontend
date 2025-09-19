import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../config/baseUrl';
import { baseQueryWithReauth } from './auth/authApi';

export const apiSlice = createApi({

    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
});