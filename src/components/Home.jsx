import {
  Stack
} from "@mui/material";
import React from "react";
import Post from "./Post";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent="space-between"
    >
      <Sidebar />
      <Post />
      <Rightbar />
    </Stack>
  );
}
