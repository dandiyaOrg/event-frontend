import { apiSlice } from "../apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: (page) => `/employee?page=${page}`
        }),

        registerEmployee: builder.mutation({
            query: ( employee ) => ({
                url: '/employee/register',
                method: 'POST',
                body: employee
            })
        }),
    })
})

export const { useGetEmployeesQuery, useRegisterEmployeeMutation } = employeeApi;