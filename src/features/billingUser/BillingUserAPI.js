// features/billingUser/BillingUserAPI.js
import { apiSlice } from "../apiSlice";

export const billingUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all billing users for admin - GET /api/v1/billingUsers
    getAllBillingUsersForAdmin: builder.query({
      query: () => "billingUsers",
    }),
  }),
});

// Export hook for components to use
export const { useGetAllBillingUsersForAdminQuery } = billingUserApi;
