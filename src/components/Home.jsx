import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import useThemeContext from "../contexts/ThemeContext";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent="space-between"
    >
      <Box
        bgcolor="skyblue"
        flex={1}
        sx={{ display: { xs: "none", sm: "block" }, p: 2 }}
      >
        Sidebar
      </Box>
      <Box bgcolor="pink" flex={4} sx={{ p: 2 }}>
        Feed
      </Box>
      <Box
        bgcolor="green"
        flex={2}
        sx={{ display: { xs: "none", sm: "block" }, p: 2 }}
      >
        Rightbar
      </Box>
    </Stack>
  );
}
