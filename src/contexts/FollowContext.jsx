import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";

const FollowContext = createContext();

export function FollowContextProvider({ children }) {
  const [follows, setFollows] = useState([]);
  const followsRef = collection(db, "follows");

  useEffect(() => {
    const unsub = onSnapshot(followsRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));

      setFollows(items);
    });

    return () => {
      unsub();
    };
  }, []);

  const state = { follows, setFollows };

  return (
    <FollowContext.Provider value={state}>{children}</FollowContext.Provider>
  );
}

export default function useFollowContext() {
  const context = useContext(FollowContext);
  return context;
}
