import { CssBaseline, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar";


export default function Layout() {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser]);

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Stack
        direction="row"
        spacing={{ xs: 0, sm: 2 }}
        justifyContent="space-between"
      >
        <Sidebar />
        <Outlet />
        <Rightbar />
      </Stack>
    </Box>
  );
}
