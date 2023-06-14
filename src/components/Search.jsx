import SearchIcon from "@mui/icons-material/Search";
import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <Paper
      sx={{
        width: "40%",
      }}
    >
      <TextField
        sx={{
          width: "100%",
        }}
        size="small"
        variant="filled"
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
    </Paper>
  );
}
