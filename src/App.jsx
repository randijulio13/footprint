import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import { FollowContextProvider } from "./contexts/FollowContext";
import { PostContextProvider } from "./contexts/PostContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import "./lib/firebase";
import router from "./router";

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
