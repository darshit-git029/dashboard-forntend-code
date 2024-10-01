import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "transaction", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"]

        }),
        getCustomers: build.query({
            query: () => "client/customer",
            providesTags: ["Customers"]
        }),
        getTransaction: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transaction",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["transaction"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
        getAdmin: build.query({
            query: () => "management/admin",
            providesTags: ["Admins"]
        }),
        getPerformance: build.query({
            query: (id) => `management/perfomance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        })
    })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminQuery, useGetPerformanceQuery, useGetDashboardQuery } = api

