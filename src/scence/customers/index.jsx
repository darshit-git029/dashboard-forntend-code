import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetCustomersQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'

const Customers = () => {

    const theme = useTheme();
    const { data, isLoading } = useGetCustomersQuery();
    console.log("this is customers data:", data);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "phoneNumber",
            headerName: "phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{5})(\d{5})/, "$1-$2")
            }
        }, 
        {
            field: "country",
            headerName: "Country",
            flex: 0.4
        },
        {
            field :"occupation",
            headerName:"Occupation",
            flex:1
        },
        {
            field :"role",
            headerName:"Role",
            flex:0.5
        },
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="CUSTOMERS" subtitle="List of Customers." />
            <Box mt="40px" height="75vh" width="100%">
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}

export default Customers