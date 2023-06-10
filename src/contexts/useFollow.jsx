import React from "react";
import useFollowContext from "../contexts/FollowContext";
import useAuth from "./useAuth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useFollow() {
  const { follows, setFollows } = useFollowContext();
  const { authUser } = useAuth();
  const followsRef = collection(db, "follows");

  const followUser = async (uid) => {
    return await addDoc(followsRef, {
      follower: authUser.uid,
      following: uid,
    });
  };

  const unfollowUser = async (uid) => {
    let { id } = follows.find(
      (follow) => follow.follower === authUser.uid && follow.following === uid
    );
    return await deleteDoc(doc(db, "follows", id));
  };

  const getFollower = async (uid) => {
    return follows.filter((follow) => {
      return follow.following === uid;
    });
  };

  const getFollowing = async (uid) => {
    return follows.filter((follow) => {
      return follow.follower === uid;
    });
  };

  const isFollowing = (uid) => {
    return !!follows.find(
      (follow) => follow.follower === authUser.uid && follow.following === uid
    );
  };

  return {
    follows,
    setFollows,
    followUser,
    getFollower,
    getFollowing,
    isFollowing,
    unfollowUser,
  };
}
