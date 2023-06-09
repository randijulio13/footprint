import React, { useEffect, useState } from "react";
import useFirestore from "./useFirestore";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function usePost() {
  const { state: users } = useFirestore("users");
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  useEffect(() => {
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
        user: users.find((user) => user.uid == data.data().uid),
      }));

      setPosts(items);
    });

    return () => {
      unsub();
    };
  }, [users]);

  const addPost = async (data) => {
    data = { ...data, createdAt: Timestamp.fromDate(new Date()) };
    let { id } = await addDoc(postsRef, data);
    return id;
  };

  const deletePost = async (postId) => {
    return await deleteDoc(doc(db, "posts", postId));
  };

  return { addPost, posts, deletePost };
}
