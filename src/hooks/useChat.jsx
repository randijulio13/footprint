import React from "react";
import useChatContext from "../contexts/ChatContext";
import useAuth from "./useAuth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import useUser from "./useUser";

export default function useChat() {
  const { chats, setChats } = useChatContext();
  const { authUser } = useAuth();
  const chatsRef = collection(db, "chats");
  const { users } = useUser();

  const sendChat = async (data) => {
    data = { ...data, createdAt: Timestamp.fromDate(new Date()) };
    await addDoc(chatsRef, data);
  };

  const getChat = async (id) => {
    let tmpChats = chats.filter((chat) => {
      return (
        (chat.senderId === id && chat.receiverId === authUser.uid) ||
        (chat.receiverId === id && chat.senderId === authUser.uid)
      );
    });

    return tmpChats.sort(
      (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
    );
  };

  const getListChat = async (id) => {
    let tmpChats = chats
      .filter((chat) => {
        return chat.receiverId === id;
      })
      .sort((objA, objB) => Number(objA.createdAt) - Number(objB.createdAt))
      .map((chat) => {
        return {
          ...chat,
          user: users.find((user) => user?.uid == chat.senderId),
        };
      });

    return [
      ...new Map(tmpChats.map((item) => [item["senderId"], item])).values(),
    ];
  };

  return { sendChat, chats, getChat, getListChat };
}
