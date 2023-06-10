import React, { createContext, useContext, useEffect, useState } from "react";
import { Timestamp, addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

  useEffect(() => {
    const unsub = onSnapshot(usersRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));

      setUsers(items);
    });

    return () => {
      unsub();
    };
  }, []);

  const state = { users, setUsers };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export default function useUserContext() {
  return useContext(UserContext);
}
