import { Box, Stack } from "@mui/material";
import React from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feeds = [
    {
      image: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100
      )}/400/300`,
      userName: "Randi Julio Fajri",
      date: "13 Juli 2023",
      description:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
  ];

  return (
    <Box flex={4} sx={{ p: { xs: 0, sm: 2 } }}>
      <Stack spacing={4}>
        {feeds.map((feed, i) => {
          return <FeedCard key={i} {...feed} />;
        })}
      </Stack>
    </Box>
  );
};

export default Feed;
