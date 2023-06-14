import { Stack } from "@mui/material";
import React from "react";
import NewPostCard from "../components/NewPostCard";
import PostCard from "../components/PostCard";
import usePost from "../hooks/usePost";

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
