import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { CssBaseline, Icon, InputBase, Switch } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IoFootsteps } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import useThemeContext from "../contexts/ThemeContext";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  width: "40%",
}));

export default function ButtonAppBar() {
  const { darkMode, setDarkMode } = useThemeContext();

  const handleChangeTheme = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" display="flex">
            <Icon sx={{ mr: 1 }}>
              <IoFootsteps />
            </Icon>
            <Typography display={{ xs: "none", sm: "block" }} variant="h6">
              FOOTPRINT
            </Typography>
          </Typography>
          <Search>
            <InputBase sx={{ width: "100%" }} placeholder="Search..." />
          </Search>
          <Switch
            checked={darkMode}
            onChange={handleChangeTheme}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
