import { apiSlice } from "../apiSlice";

export const orderApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (page) => `/employee?page=${page}`
        }),
    })

})

export const {
    getOrders
} = orderApi; 