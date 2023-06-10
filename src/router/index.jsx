import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Layout from "../components/Layout";
import Login from "../pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default router;
