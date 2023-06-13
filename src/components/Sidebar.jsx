import {
  ChatBubble,
  DarkMode,
  Home,
  Inbox,
  LightMode,
  Logout,
  People,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useThemeContext from "../contexts/ThemeContext";
import useElementHeight from "../hooks/useElementHeight";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useChat from "../hooks/useChat";

const Sidebar = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  const sidebarRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState();
  const [sidebarHeight, setSidebarHeight] = useState();
  const appbarHeight = useElementHeight("appbar");
  const { authUser, handleSignout } = useAuth();

  const handleResize = () => {
    setSidebarWidth(() => {
      return sidebarRef?.current?.clientWidth;
    });

    setSidebarHeight(() => {
      return sidebarRef?.current?.clientHeight;
    });
  };

  const [newMessage, setNewMessage] = useState(0);
  const { getNewMessage, chats } = useChat();

  useEffect(() => {
    let newMessage = getNewMessage(authUser.uid);
    setNewMessage(newMessage);
  }, [chats, authUser]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarRef, appbarHeight]);

  const navigate = useNavigate();

  const menus = [
    { label: "Home", icon: <Home />, onClick: () => navigate("/") },
    {
      label: "Profile",
      icon: <Person />,
      onClick: () => navigate(`/profile/${authUser?.uid}`),
    },
    { label: "Chat", icon: <ChatBubble />, onClick: () => navigate("/chat") },
    { label: "Friends", icon: <People />, onClick: () => navigate("/friend") },
    // { label: "Settings", icon: <Settings /> },
    {
      label: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightMode /> : <DarkMode />,
      onClick: () => setDarkMode((darkMode) => !darkMode),
    },
    { label: "Logout", icon: <Logout />, onClick: () => handleSignout() },
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
                  <ListItemButton
                    onClick={menu.onClick ? menu.onClick : null}
                    sx={{ display: "flex", justfiyContent: "space-between" }}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                    {menu.label === "Chat" && newMessage.length > 0 && (
                      <Chip
                        color="primary"
                        label={newMessage.length}
                        size="small"
                      />
                    )}
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
