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

export default function usePostLike(postId) {
  const [postLikes, setPostLikes] = useState([]);
  const postLikesRef = collection(db, "postLikes");
  let q = query(postLikesRef, where("postId", "==", postId));

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
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
    postLikes.map(async (like) => {
      await deleteDoc(doc(db, "postLikes", like.id));
    });
  };

  return { likePost, unlikePost, postLikes, deleteLikes };
}
