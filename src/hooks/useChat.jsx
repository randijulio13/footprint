import React from "react";
import useChatContext from "../contexts/ChatContext";
import useAuth from "./useAuth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import useUser from "./useUser";

export default function useChat() {
  const { chats, chatsRef, chatRooms, chatRoomsRef } = useChatContext();
  const { authUser } = useAuth();
  const { users, getUser } = useUser();

  const sendChat = async (data) => {
    data = {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      read: [authUser.uid],
    };
    await addDoc(chatsRef, data);
  };

  const getChatRoom = async (id) => {
    return chatRooms.find((room) => {
      return room.member.includes(id) && room.member.includes(authUser.uid);
    });
  };

  const createChatRoom = async (data) => {
    return await addDoc(chatRoomsRef, data);
  };

  const getUserChatRooms = async (id) => {
    return chatRooms
      .filter((room) => {
        return room.member.includes(id);
      })
      .map((room) => {
        let member = getChatRoomMember(room.id);
        member = member.filter((mmbr) => mmbr.id !== authUser.uid);
        let latestMessage = chats.filter((chat) => {
          return chat.roomId === room.id;
        });
        latestMessage = latestMessage.sort(
          (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
        );
        return {
          roomId: room.id,
          member,
          latestMessage: latestMessage[0],
        };
      });
  };

  const getChat = async (id) => {
    let tmpChats = chats.filter((chat) => {
      return chat.roomId === id;
    });

    return tmpChats.sort(
      (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
    );
  };

  const getNewMessage = (id) => {
    let userChatRooms = chatRooms.filter((chatRoom) => {
      return chatRoom.member.includes(id);
    });

    let tmpChats = [];
    userChatRooms.map((chatRoom) => {
      chats.map((chat) => {
        if (chat.roomId === chatRoom.id && !chat.read.includes(id)) {
          tmpChats.push(chat);
        }
      });
    });

    return tmpChats;
  };

  const readMessage = async ({ roomId, id = authUser.uid }) => {
    const batch = writeBatch(db);

    chats
      .filter((chat) => {
        return chat.roomId === roomId && !chat.read.includes(id);
      })
      .map((chat) => {
        let chatRef = doc(db, "chats", chat.id);
        chat.read.push(id);
        batch.set(chatRef, { ...chat });
      });

    return await batch.commit();
  };

  const getChatRoomMember = (roomId) => {
    let res = chatRooms?.find((room) => roomId === room.id);
    return res?.member.map((m) => {
      return users.find((user) => user.id === m);
    });
  };

  return {
    sendChat,
    chats,
    getChat,
    getNewMessage,
    readMessage,
    createChatRoom,
    getUserChatRooms,
    getChatRoom,
    getChatRoomMember,
  };
}
