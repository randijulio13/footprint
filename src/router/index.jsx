import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import Chat from "../pages/Chat";
import ChatIndex from "../pages/ChatIndex";
import Friend from "../pages/Friend";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ContextProvider from "../contexts/ContextProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={
          <ContextProvider>
            <Layout />
          </ContextProvider>
        }
      >
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
