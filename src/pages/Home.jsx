import { Box, Stack } from "@mui/material";
import React from "react";
import usePost from "../hooks/usePost";
import PostCard from "../components/PostCard";
import NewPostCard from "../components/NewPostCard";

const Home = () => {
  const { posts } = usePost();

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 3 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <NewPostCard />
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </Stack>
  );
};

export default Home;
