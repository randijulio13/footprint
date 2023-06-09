import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import router from "./router";
import "./lib/firebase";

export default function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}
