import styled from "@emotion/styled";
import { Logout, Person, Menu as MenuIcon } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { IoFootsteps } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  color: "white",
}));

export default function Navbar({ openDrawer }) {
  const [anchorMenu, setAnchorMenu] = useState(false);
  const { authUser, handleSignout } = useAuth();
  const navigate = useNavigate();

  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleProfile = () => {
    navigate(`/profile/${authUser?.uid}`);
    handleCloseMenu();
  };

  return (
    <AppBar position="sticky" id="appbar">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={openDrawer}
          sx={{ display: { xs: "block", sm: "none" }, color: "inherit" }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Typography variant="h6">
            <IoFootsteps />
          </Typography>
          <Typography variant="h6">FOOTPRINT</Typography>
        </Box>
        {/* <Search /> */}

        <Icons>
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            {authUser?.displayName}
          </Typography>
          <IconButton onClick={handleOpenMenu}>
            <Avatar src={authUser?.photoURL} />
          </IconButton>
        </Icons>
        <Menu
          PaperProps={{
            sx: { width: 200 },
          }}
          open={Boolean(anchorMenu)}
          anchorEl={anchorMenu}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
