/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Header from "components/Header";
import { useGetTransactionQuery } from 'state/api';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {DataGridCustomToolbar} from 'components/DataGridCustomToolBar';


const Transaction = () => {
    DataGridCustomToolbar()
    const theme = useTheme();
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState({})    
    const [search, setSearch] = useState("")

    const { data, isLoading } = useGetTransactionQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    });
    // console.log("transaction data", data);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of products",
            flex: 0.4,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ]


    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TRANSACTIONs" subtitle="See your list of Transactions." />
            <Box height="80vh" width="100%">

                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transaction) || []}
                    columns={columns}
                    // components={{Toolbar : DataGridCustomToolbar}}
                    rowCount={(data && data.transaction) || 0}
                    // pagination
                    // page={page}
                    // pageSize={pageSize}
                    // paginationMode='server'
                    // sortingMode='server'
                    // onPageChange={(newPage) => setPage(newPage)}
                    // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} 
                    // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                />
            </Box>
        </Box>
    )
}

export default Transaction
