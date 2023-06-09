import { Send as SendIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import { StyledCard } from "./PostCard";

export default function NewPostCard() {
  const { authUser } = useAuth();
  const { addPost } = usePost();
  const [postContent, setPostContent] = useState("");

  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    await addPost({
      post: postContent,
      uid: authUser.uid,
    });
    setPostContent("");
  };

  return (
    <StyledCard component="form" onSubmit={handleCreateNewPost}>
      <CardHeader
        title={<Typography>{authUser?.displayName}</Typography>}
        avatar={
          <Avatar referrerPolicy="no-referrer" src={authUser?.photoURL} />
        }
      />
      <CardContent>
        <TextField
          sx={{ width: "100%" }}
          label="Write new post"
          multiline
          variant="filled"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </CardContent>
      <CardActions sx={{ p: 2, display: "flex", justifyContent: "end" }}>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Post
        </Button>
      </CardActions>
    </StyledCard>
  );
}
