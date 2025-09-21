import { apiSlice } from "../apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all transactions for admin
        getTransactionsForAdmin: builder.query({
            query: () => '/transactions',
        }),
    })
});

export const {
    useGetTransactionsForAdminQuery,
} = transactionApi;
