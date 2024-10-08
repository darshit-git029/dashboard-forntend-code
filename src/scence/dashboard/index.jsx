import React from 'react'
import FlexBetween from 'components/FlexBetween'
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material'
import Header from 'components/Header'
import { Box, useTheme, Typography, Button, useMediaQuery } from '@mui/material'
import { useGetDashboardQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import BreakDownChart from 'components/BreakDownChart'
import OverviewChart from 'components/OverviewChart'
import StatBox from 'components/StatBox'

const Dashboard = () => {


  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const isNonMediumScreen = useMediaQuery("(min-width:1200px)")
  const theme = useTheme()
  const { data, isLoading } = useGetDashboardQuery()

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
  ];


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStat.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStat.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius:"1rem"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transaction) || []}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
        <Box
            gridColumn="span 4"
            gridRow="span 3"        
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
        >
          <Typography variant='h6' sx={{color:theme.palette.secondary[100]}}>
          Sales By category
          </Typography>
          <BreakDownChart isDashboard={true}/>
          <Typography p="o o.6rem" fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
          Breaskdown of Real States and information vai category for revenue made for this year total sales
          </Typography>
        </Box>
      </Box>
    </Box>

  )
}

export default Dashboard