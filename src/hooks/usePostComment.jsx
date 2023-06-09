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
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import useFirestore from "./useFirestore";

export default function usePostComment(postId) {
  const [postComments, setPostComments] = useState([]);
  const { state: users } = useFirestore("users");
  const postCommentsRef = collection(db, "postComments");
  let q = query(postCommentsRef, where("postId", "==", postId));

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((data) => {
        return {
          ...data.data(),
          user: users.find((user) => user.uid == data.data().uid),
          id: data.id,
        };
      });
      setPostComments(items);
    });

    return () => {
      unsub();
    };
  }, [users]);

  const commentPost = async (data) => {
    data = {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      postId,
    };
    let { id } = await addDoc(postCommentsRef, data);
    return id;
  };

  const deleteComment = async (commentId) => {
    return await deleteDoc(doc(db, "postComments", commentId));
  };

  const deleteComments = async () => {
    postComments.map(async (comment) => {
      await deleteDoc(doc(db, "postComments", comment.id));
    });
  };

  return { commentPost, deleteComment, postComments, deleteComments };
}
