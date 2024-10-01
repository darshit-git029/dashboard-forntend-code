/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import Flexbetween from './FlexBetween'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from 'state'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import ProfilePhoto from "assets/furrisic.jpg"
import { useGetUserQuery } from 'state/api'
const Navbar = ({
    user,
    isSideBarOpen,
    setIsSideBarOpen
}) => {
    const userId = useSelector(state => state.global.userId);
    const { data } = useGetUserQuery(userId);
    const dispatch = useDispatch()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl)
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return <AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none"
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* left side  */}
            <Flexbetween>
                <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)
                }>
                    <MenuIcon />
                </IconButton>
                <Flexbetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="9px"
                    gap="3rem"
                    p="0.1rem 1.5rem"
                >
                    <InputBase placeholder='Search...' />
                    <IconButton>
                        <Search />
                    </IconButton>
                </Flexbetween>
            </Flexbetween>
            {/* right side */}
            <Flexbetween gap="1rem">
                <IconButton onClick={() => dispatch(setMode())} >
                    {theme.palette.mode === "dark" ?
                        (<DarkModeOutlined sx={{ fontSize: "25px" }} />) :
                        (<LightModeOutlined sx={{ fontSize: "25px" }} />)}
                </IconButton>
              
                <Flexbetween>
                    <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "0rem" }}>
                        <Box
                            component="img"
                            alt="Profile"
                            src={ProfilePhoto}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[100] }}>
                                {data?.user?.name || "User Name"}
                            </Typography>
                            <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                                {data?.user?.occupation || "Occupation"}
                            </Typography>
                        </Box> 
                            <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300] }} />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{vertical:"bottom", horizontal:"center"}}
                    >
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                </Flexbetween>
            </Flexbetween>
        </Toolbar>

    </AppBar>
}

export default Navbar