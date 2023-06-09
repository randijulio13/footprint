import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import LoginPage from "../components/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

export default router;
