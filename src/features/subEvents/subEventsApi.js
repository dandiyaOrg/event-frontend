import { apiSlice } from "../apiSlice";

export const subEventsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all subevents for a specific event
        getAllSubeventsOfEvent: builder.query({
            query: (eventId) => `/subevent/event/${eventId}`,
        }),

        // Get subevent by ID
        getSubEventById: builder.query({
            query: (subeventId) => `/subevent/${subeventId}`,
        }),

        // Create new subevent with image upload
        createSubEvent: builder.mutation({
            query: (subeventData) => {
                const formData = new FormData();
                
                // Append all fields to FormData
                Object.keys(subeventData).forEach(key => {
                    if (key === 'image' && subeventData[key]) {
                        formData.append('image', subeventData[key]);
                    } else if (subeventData[key] !== undefined && subeventData[key] !== null) {
                        formData.append(key, subeventData[key]);
                    }
                });

                return {
                    url: '/subevent/register',
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        // Update subevent with optional image upload
updateSubEvent: builder.mutation({
  query: ({ subeventId, subeventData }) => {
    console.log('RTK Query - Received data type:', subeventData.constructor.name);
    
    // Check if it's FormData or regular object
    if (subeventData instanceof FormData) {
      console.log('Sending FormData');
      return {
        url: `/subevent/${subeventId}`,
        method: 'PUT',
        body: subeventData,
      };
    } else {
      console.log('Sending JSON:', subeventData);
      return {
        url: `/subevent/${subeventId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subeventData),
      };
    }
  },
  invalidatesTags: (result, error, { subeventId }) => [
    { type: 'SubEvent', id: subeventId },
    { type: 'SubEvent', id: 'LIST' }
  ],
}),



        // Delete subevent
        deleteSubEvent: builder.mutation({
            query: (subeventId) => ({
                url: `/subevent/${subeventId}`,
                method: 'DELETE'
            }),
        })
    })
});

export const {
    useGetAllSubeventsOfEventQuery,
    useGetSubEventByIdQuery,
    useCreateSubEventMutation,
    useUpdateSubEventMutation,
    useDeleteSubEventMutation,
} = subEventsApi;
