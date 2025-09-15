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
            }),
        }),

        toggleStatus: builder.mutation({
            query: (employeeId) => ({
                url: `/employee/toggleStatus/${employeeId}`,
                method: "POST",
            }), 
        }), 

        updateEmployee: builder.mutation({
            query: ({ employee, employeeId }) => ({
                url: `/employee/${employeeId}`,
                method: 'PUT'
            }) 
        }),

        deleteEmployee: builder.mutation({
            query: (employeeId) => ({
                url: `/employee/${employeeId}`,
                method: 'DELETE'
            })
        })


    })
})

export const { 
    useGetEmployeesQuery, 
    useRegisterEmployeeMutation,
    useToggleStatusMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    
} = employeeApi;