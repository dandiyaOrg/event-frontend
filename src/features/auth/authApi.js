import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout, setSession } from './authSlice';
import { BASE_URL } from '../../config/baseUrl.js';

const baseQuery = fetchBaseQuery({
    
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const { accessToken, adminId } = getState().auth;

        if (accessToken){
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        if (adminId){
            headers.set('x-admin-id', adminId);
        }

        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401){

        const { refreshToken } = api.getState().auth;

        if (refreshToken){
            const refreshResult = await baseQuery(
                {
                    url: '/admin/login/refresh',
                    method: 'POST',
                    body: { refreshToken: refreshToken}
                },
                api,
                extraOptions
            );

            if (refreshResult.data){
                api.dispatch(
                    setCredentials({
                        accessToken: refreshResult.data.accessToken,
                        refreshToken: refreshResult.data.refreshToken,
                        adminId: refreshResult.data.adminId
                    })
                );

                result = await baseQuery(args, api, extraOptions);

            } else {
                api.dispatch(logout());
            }
        }
    }

    return result;
}


export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    
    endpoints: (builder) => ({

        // LOGIN
        login: builder.mutation({
            query: (credentials) => ({
                url: '/admin/login',
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSession(data.data.admin_id))
                } catch {}
            }
        }),

        verifyOtp: builder.mutation({
            query: ({ admin_id, otp }) => ({
                url: '/admin/login/verifyotp',
                method: 'POST',
                body: { admin_id, otp }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                         setCredentials({
                             accessToken: data.data.accessToken,
                             refreshToken: data.data.refreshToken,
                             adminId: data.data.admin.admin_id
                         })
                    );
                } catch (error) {}
            }
        }),

        // NOT CREATED IN BACKEND YET SO DONT EXPORT
        getProfile: builder.query({
            query: () => '',
        }),
    })
})

export const { useVerifyOtpMutation, useLoginMutation } = authApi;