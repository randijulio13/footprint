import { Collapse, Stack } from "@mui/material";
import React from "react";
import NewPostCard from "../components/NewPostCard";
import PostCard from "../components/PostCard";
import usePost from "../hooks/usePost";
import { TransitionGroup } from "react-transition-group";

const Home = () => {
  const { posts } = usePost();

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 3 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <TransitionGroup>
        <Collapse>
          <NewPostCard />
        </Collapse>
        {posts.map((post) => {
          return (
            <Collapse key={post.id}>
              <PostCard {...post} />
            </Collapse>
          );
        })}
      </TransitionGroup>
    </Stack>
  );
};

export default Home;
