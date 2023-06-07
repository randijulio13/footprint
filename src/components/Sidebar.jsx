import {
  DarkMode,
  Home,
  Inbox,
  LightMode,
  Logout,
  People,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useThemeContext from "../contexts/ThemeContext";
import useElementHeight from "../hooks/useElementHeight";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  const sidebarRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState();
  const [sidebarHeight, setSidebarHeight] = useState();
  const appbarHeight = useElementHeight("appbar");

  const handleResize = () => {
    setSidebarWidth(() => {
      return sidebarRef?.current?.clientWidth;
    });

    setSidebarHeight(() => {
      return sidebarRef?.current?.clientHeight;
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarRef, appbarHeight]);

  const menus = [
    { label: "Home", icon: <Home /> },
    { label: "Inbox", icon: <Inbox /> },
    { label: "Friends", icon: <People /> },
    { label: "Settings", icon: <Settings /> },
    {
      label: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightMode /> : <DarkMode />,
      onClick: () => setDarkMode((darkMode) => !darkMode),
    },
    { label: "Logout", icon: <Logout /> },
  ];

  return (
    <Box
      flex={1}
      sx={{
        display: { xs: "none", md: "block" },
        p: 2,
        width: "100%",
        height: `calc(100vh - ${appbarHeight}px)`,
      }}
    >
      <Box
        ref={sidebarRef}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          position="fixed"
          sx={{ width: sidebarWidth, height: sidebarHeight, overflow: "auto" }}
        >
          <List>
            {menus.map((menu, index) => {
              return (
                <ListItem disablePadding key={index}>
                  <ListItemButton onClick={menu.onClick ? menu.onClick : null}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
