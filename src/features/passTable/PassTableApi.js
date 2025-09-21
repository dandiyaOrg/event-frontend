import { apiSlice } from "../apiSlice";

export const passTableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create new pass - POST /api/pass/create
    createPass: builder.mutation({
      query: (passData) => ({
        url: '/pass/create',
        method: "POST",
        body: passData,
      }),
    }),

    // Get all passes for a specific subevent - GET /api/pass/subevent/:subeventId
        getAllPassesForSubevent: builder.query({
        query: (subeventId) => `pass/subevent/${subeventId}`,
        }),

    // Get pass by ID - GET /api/pass/:passId
    getPassById: builder.query({
      query: (passId) => `/${passId}`,
    }),

    // Update pass - PATCH /api/pass/:passId
    updatePass: builder.mutation({
      query: ({ passId, passData }) => ({
        url: `pass/${passId}`,
        method: "PATCH",
        body: passData,
      }),
    }),

    togglePassStatus: builder.mutation({
      query: (passId) => ({
        url: `/toggle/${passId}`,
        method: "PUT",
      }),
    }),

    deletePass: builder.mutation({
      query: (passId) => ({
        url: `pass/${passId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for components to use
export const {
  useGetAllPassesForSubeventQuery,
  useGetPassByIdQuery,
  useCreatePassMutation,
  useDeletePassMutation,
  useTogglePassStatusMutation,
  useUpdatePassMutation,
} = passTableApi;
