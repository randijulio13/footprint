import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Badge,
  Button,
  CssBaseline,
  Icon,
  IconButton,
  Input,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Switch,
  alpha,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IoFootsteps } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import useThemeContext from "../contexts/ThemeContext";
import {
  ContentCut,
  DarkMode,
  LightMode,
  Logout,
  Mail,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useState } from "react";

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

const RotateIconButton = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform"),
  "&:active": {
    transform: "rotate(-180deg)",
  },
}));

export default function ButtonAppBar() {
  const { darkMode, setDarkMode } = useThemeContext();
  const [anchorMenu, setAnchorMenu] = useState(false);

  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleChangeTheme = (e) => {
    setDarkMode((darkMode) => !darkMode);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="sticky">
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
          <Icons sx={{ display: { xs: "none", sm: "block" } }}>
            <RotateIconButton
              aria-label="theme"
              onClick={handleChangeTheme}
              color="inherit"
            >
              {darkMode ? <DarkMode /> : <LightMode />}
            </RotateIconButton>
            <IconButton onClick={handleOpenMenu}>
              <Badge badgeContent={2} color="error">
                <Avatar sx={{ width: 24, height: 24 }} />
              </Badge>
            </IconButton>
          </Icons>
          <Icons sx={{ display: { xs: "block", sm: "none" } }}>
            <Button
              onClick={handleOpenMenu}
              color="inherit"
              startIcon={<Avatar sx={{ width: 24, height: 24 }} />}
            >
              Udin
            </Button>
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
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
