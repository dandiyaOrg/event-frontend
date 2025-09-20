import { apiSlice } from "../apiSlice";

export const eventApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        // FOR EVENTS
        getEvents: builder.query({
            query: () => '/event/all'
        }),

        getEventById: builder.query({
            query: (eventId) => `/event/${eventId}`
        }),

        // FOR SUBEVENTS
        getSubeventsByEventId: builder.query({
            query: (eventId) => `/subevent/event/${eventId}`
        }),

        createSubevent: builder.mutation({
            query: (event) => ({
                url: '/subevent/register',
                method: 'POST',
                body: event
            })
        }),
    })
})

export const { 
    useGetEventsQuery,
    useGetEventByIdQuery,
    useGetSubeventsByEventIdQuery,
    useCreateSubeventMutation,

} = eventApi;