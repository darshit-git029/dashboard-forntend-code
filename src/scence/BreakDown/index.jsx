import React from 'react'
import {Box} from "@mui/material"
import Header from 'components/Header'
import BreakDownChart from 'components/BreakDownChart'

const BreakDown = () => {
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="BREAK DOWN" subtitle="Breakdown sales by category" />
    <Box height="75vh" mt="40px">
        <BreakDownChart/>
    </Box>
</Box>
  )
}

export default BreakDown
