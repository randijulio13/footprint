import { AuthContextProvider } from "./AuthContext";
import { ChatContextProvider } from "./ChatContext";
import { FollowContextProvider } from "./FollowContext";
import { PostContextProvider } from "./PostContext";
import { ThemeContextProvider } from "./ThemeContext";
import { UserContextProvider } from "./UserContext";
import "../lib/firebase";

export default function ContextProvider({ children }) {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <FollowContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </FollowContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}
