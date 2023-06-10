import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

import useUserContext from "./UserContext";
import { db } from "../lib/firebase";

const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { users } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [postComments, setPostComments] = useState([]);

  const postsRef = collection(db, "posts");
  const postLikesRef = collection(db, "postLikes");
  const postCommentsRef = collection(db, "postComments");

  useEffect(() => {
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
        user: users.find((user) => user?.uid == data?.data()?.uid),
      }));

      setPosts(items);
    });

    return () => {
      unsub();
    };
  }, [users]);

  useEffect(() => {
    const unsub = onSnapshot(postCommentsRef, (snapshot) => {
      const items = snapshot.docs.map((data) => {
        return {
          ...data.data(),
          user: users.find((user) => user?.uid == data?.data()?.uid),
          id: data.id,
        };
      });
      setPostComments(items);
    });

    return () => {
      unsub();
    };
  }, [users]);

  useEffect(() => {
    const unsub = onSnapshot(postLikesRef, (snapshot) => {
      const items = snapshot.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      setPostLikes(items);
    });

    return () => {
      unsub();
    };
  }, []);

  const state = {
    posts,
    setPosts,
    postLikes,
    setPostLikes,
    postComments,
    setPostComments,
  };
  return <PostContext.Provider value={state}>{children}</PostContext.Provider>;
}

export default function usePostContext() {
  const context = useContext(PostContext);
  return context;
}
