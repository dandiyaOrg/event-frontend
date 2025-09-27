import { apiSlice } from "../apiSlice";

export const attendeeApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAttendees: builder.query({
            query: (page) => `/employee?page=${page}`
        }),
    })

})

export const {
    getAttendees
} = attendeeApi; 