import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import usePostContext from "../contexts/PostContext";

export default function usePostLike(postId) {
  const { postLikes, setPostLikes } = usePostContext();
  const postLikesRef = collection(db, "postLikes");

  const getPostLikes = async () => {
    return postLikes.filter((postLike) => {
      return postLike.postId === postId;
    });
  };

  const likePost = async (uid) => {
    await addDoc(postLikesRef, {
      uid,
      postId,
    });
  };

  const unlikePost = async (uid) => {
    let { id } = postLikes.find(
      (like) => like.uid === uid && like.postId === postId
    );
    return await deleteDoc(doc(db, "postLikes", id));
  };

  const deleteLikes = async () => {
    postLikes
      .filter((postLike) => {
        return postLike.postId === postId;
      })
      .map(async (like) => {
        await deleteDoc(doc(db, "postLikes", like.id));
      });
  };

  return { likePost, unlikePost, postLikes, deleteLikes, getPostLikes };
}
