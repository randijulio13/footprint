import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import router from "./router";
import "./lib/firebase";
import { UserContextProvider } from "./contexts/UserContext";
import { PostContextProvider } from "./contexts/PostContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FollowContextProvider } from "./contexts/FollowContext";
import { ChatContextProvider } from "./contexts/ChatContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <PostContextProvider>
            <FollowContextProvider>
              <ChatContextProvider>
                <RouterProvider router={router} />
              </ChatContextProvider>
            </FollowContextProvider>
          </PostContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
