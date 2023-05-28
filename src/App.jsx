import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import router from "./router";

export default function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}
