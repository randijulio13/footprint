import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const state = { darkMode, setDarkMode };

  return (
    <ThemeContext.Provider value={state}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default function useThemeContext() {
  return useContext(ThemeContext);
}
