import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar";
import {
  ChatBubble,
  DarkMode,
  Home,
  LightMode,
  Logout,
  People,
  Person,
} from "@mui/icons-material";
import useThemeContext from "../contexts/ThemeContext";

export default function Layout() {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [drawerMenu, setDrawerMenu] = useState(false);
  const { darkMode, setDarkMode } = useThemeContext();

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  const openDrawer = () => {
    setDrawerMenu(true);
  };

  const closeDrawer = () => {
    setDrawerMenu(false);
  };

  const menus = [
    {
      label: "Home",
      icon: <Home />,
      onClick: () => [navigate("/"), closeDrawer()],
    },
    {
      label: "Profile",
      icon: <Person />,
      onClick: () => [navigate(`/profile/${authUser?.uid}`), closeDrawer()],
    },
    {
      label: "Chat",
      icon: <ChatBubble />,
      onClick: () => [navigate("/chat"), closeDrawer()],
    },
    {
      label: "Friends",
      icon: <People />,
      onClick: () => [navigate("/friend"), closeDrawer()],
    },
    // { label: "Settings", icon: <Settings /> },
    {
      label: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightMode /> : <DarkMode />,
      onClick: () => setDarkMode((darkMode) => !darkMode),
    },
    {
      label: "Logout",
      icon: <Logout />,
      onClick: () => [handleSignout(), closeDrawer()],
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline enableColorScheme />
      <Navbar {...{ openDrawer, closeDrawer }} />
      <Drawer anchor={"left"} open={drawerMenu} onClose={closeDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {menus.map((menu, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={menu.onClick ? menu.onClick : null}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        spacing={{ xs: 0, sm: 2 }}
        justifyContent="space-between"
      >
        <Sidebar />
        <Box flex={4}>
          <Outlet />
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
}
