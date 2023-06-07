import {
  Box,
  Stack
} from "@mui/material";
import React from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

export default function Home() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent="space-between"
    >
      <Sidebar />
      <Feed />
      <Rightbar />
    </Stack>
  );
}
