import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import React from "react";
import useThemeContext from "../contexts/ThemeContext";


export default function Home() {
  const { darkMode, setDarkMode } = useThemeContext();

  const changeTheme = () => {
    setDarkMode((mode) => !mode);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography>
              Hello
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={changeTheme}>
              Button
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
