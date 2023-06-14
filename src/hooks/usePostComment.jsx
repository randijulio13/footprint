import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import usePostContext from "../contexts/PostContext";
import { db } from "../lib/firebase";

export default function usePostComment(postId) {
  const { postComments } = usePostContext();
  const postCommentsRef = collection(db, "postComments");

  const getPostComments = async () => {
    let tmpComments = postComments.filter((postComment) => {
      return postComment.postId === postId;
    });

    return tmpComments.sort(
      (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
    );
  };

  const addComment = async (data) => {
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
    postComments
      .filter((postComment) => {
        return postComment.postId === postId;
      })
      .map(async (comment) => {
        await deleteDoc(doc(db, "postComments", comment.id));
      });
  };

  return {
    addComment,
    deleteComment,
    postComments,
    deleteComments,
    getPostComments,
  };
}
