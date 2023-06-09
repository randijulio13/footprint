import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import useLocalStorage from "./useLocalStorage";
import useFirestore from "./useFirestore";
import { Timestamp } from "firebase/firestore";

export default function useAuth() {
  const [authUser, setAuthUser] = useLocalStorage("authUser", "");
  const { data: users, setData: addUser } = useFirestore("users");

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

  const handleSignout = () => {
    signOut(auth);
  };

  const handleSignin = async () => {
    let result = await signInWithPopup(auth, googleProvider);
    addUser(result.user.uid, {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
      lastLogin: Timestamp.fromDate(new Date()),
    });
  };

  return { authUser, setAuthUser, handleSignout, handleSignin };
}
