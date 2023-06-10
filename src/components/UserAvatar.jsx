import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function UserAvatar(user) {
  let username = user?.email?.split("@")[0];
  return (
    <Link to={`/profile/${user.uid}`}>
      <Avatar src={user?.photoURL} />
    </Link>
  );
}