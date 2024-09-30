import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PointOfSaleOutlined,
  SettingsOutlined
} from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Flexbetween from './FlexBetween.jsx';
import ProfilePhoto from "assets/meet.jpeg";
import { useGetUserQuery } from 'state/api.js';

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Product", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transaction", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  {text : "BreakeDown" ,icon: <CalendarMonthOutlined />},
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> }
];

const SideBar = ({
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen
}) => {
  const userId = useSelector(state => state.global.userId);
  const { data } = useGetUserQuery(userId);
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: 'border-box',
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth
            }
          }}
        >
          {/* Sidebar Header */}
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Flexbetween color={theme.palette.secondary.main}>
                <Typography variant='h4' fontWeight="bold">
                  ECOMVISION
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Flexbetween>
            </Box>

            {/* Sidebar Navigation Items */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lctext = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lctext}`);
                        setActive(lctext);
                      }}
                      sx={{
                        backgroundColor: active === lctext ? theme.palette.secondary[300] : "transparent",
                        color: active === lctext ? theme.palette.primary[600] : theme.palette.secondary[100]
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lctext ? theme.palette.primary[600] : theme.palette.secondary[200]
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lctext && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Sidebar Footer (User Details) */}
          <Box position="static" bottom="0rem" width="100%" marginBottom="1.5rem">
            <Divider />
            <Flexbetween gap="1rem" m="1.5rem 2rem 0rem 3rem">
              <Box
                component="img"
                alt="Profile"
                src={ProfilePhoto}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                  {data?.user?.name || "User Name"}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                  { "Occupation"}
                </Typography>
              </Box>
              <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
            </Flexbetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
