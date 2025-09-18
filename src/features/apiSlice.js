import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../config/baseUrl';

export const apiSlice = createApi({

    reducerPath: 'api',
    baseQuery: fetchBaseQuery({     
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const { accessToken, adminId } = getState().auth;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`); // ✅ send JWT
            }
            if (adminId) {
                headers.set('x-admin-id', adminId); // ✅ optional admin id
            }

            return headers;
        }
    }),
    endpoints: () => ({})
});