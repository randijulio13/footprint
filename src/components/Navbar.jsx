import styled from "@emotion/styled";
import { Logout, People, Person } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  alpha,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { IoFootsteps } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  transition: "all 0.5s",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  width: "40%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.black,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.8),
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  color: "white",
}));

export default function Navbar() {
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="h6">
            <IoFootsteps />
          </Typography>
          <Typography display={{ xs: "none", sm: "block" }} variant="h6">
            FOOTPRINT
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput placeholder="Search..." />
        </Search>
        <Icons>
          {authUser?.displayName}
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
