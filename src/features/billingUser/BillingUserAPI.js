// features/billingUser/BillingUserAPI.js
import { apiSlice } from "../apiSlice";

export const billingUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllBillingUsersForAdmin: builder.query({
      query: () => "/admin/billingUsers",
    }),
  }),
});

// Export hook for components to use
export const { useGetAllBillingUsersForAdminQuery } = billingUserApi;
