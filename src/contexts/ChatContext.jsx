import { collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";

const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  const chatsRef = collection(db, "chats");
  const chatRoomsRef = collection(db, "chatRooms");

  useEffect(() => {
    const unsub = onSnapshot(chatsRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));

      setChats(items);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(chatRoomsRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));

      setChatRooms(items);
    });

    return () => {
      unsub();
    };
  }, []);

  const state = {
    chats,
    setChats,
    chatsRef,
    chatRooms,
    setChatRooms,
    chatRoomsRef,
  };

  return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
}

export default function useChatContext() {
  const context = useContext(ChatContext);
  return context;
}
