import { apiSlice } from "../apiSlice";

export const employeeApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: (page) => `/employee?page=${page}`
        }),

        getEmployeeById: builder.query({
            query: (employeeId) => `/employee/${employeeId}`,
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
                method: 'PUT',
                body:employee
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
    useGetEmployeeByIdQuery,
    useRegisterEmployeeMutation,
    useToggleStatusMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    
} = employeeApi;