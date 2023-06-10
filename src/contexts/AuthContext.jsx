import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { auth } from "../lib/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useLocalStorage("authUser", "");

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => authListener?.();
  }, []);

  const state = { authUser, setAuthUser };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
