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
import ChatIndex from "../pages/ChatIndex";
import Chat from "../pages/Chat";
import Friend from "../pages/Friend";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/chat">
          <Route index element={<ChatIndex />} />
          <Route path=":id" element={<Chat />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default router;
