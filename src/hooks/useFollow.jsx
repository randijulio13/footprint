import React from "react";
import useFollowContext from "../contexts/FollowContext";
import useAuth from "./useAuth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import useUserContext from "../contexts/UserContext";

export default function useFollow() {
  const { follows, setFollows, followsRef } = useFollowContext();
  const { users } = useUserContext();
  const { authUser } = useAuth();

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

  const getFollower = (uid) => {
    let follower = follows
      .filter((follow) => {
        return follow.following === uid;
      })
      .map((follow) => {
        return follow.follower;
      });

    return users.filter((user) => {
      return follower.includes(user.id);
    });
  };

  const getFollowing = (uid) => {
    let following = follows
      .filter((follow) => {
        return follow.follower === uid;
      })
      .map((follow) => {
        return follow.following;
      });

    return users.filter((user) => {
      return following.includes(user.id);
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
