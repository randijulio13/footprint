import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import usePostContext from "../contexts/PostContext";
import { db } from "../lib/firebase";

export default function usePost() {
  const { posts, setPosts } = usePostContext();
  const postsRef = collection(db, "posts");

  const addPost = async (data) => {
    data = { ...data, createdAt: Timestamp.fromDate(new Date()) };
    let { id } = await addDoc(postsRef, data);
    return id;
  };

  const deletePost = async (postId) => {
    return await deleteDoc(doc(db, "posts", postId));
  };

  const getUserPost = async (uid) => {
    return posts.filter((post) => {
      return post.uid === uid;
    });
  };

  return { addPost, posts, deletePost, getUserPost, setPosts };
}
