import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useElementHeight from "../hooks/useElementHeight";

const Rightbar = () => {
  const rightbarRef = useRef();
  const [rightbarWidth, setRightbarWidth] = useState();
  const [rightbarHeight, setRightbarHeight] = useState();
  const appbarHeight = useElementHeight("appbar");

  const handleResize = () => {
    setRightbarWidth(() => {
      return rightbarRef?.current?.clientWidth;
    });

    setRightbarHeight(() => {
      return rightbarRef?.current?.clientHeight;
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rightbarRef, appbarHeight]);

  return (
    <Box
      flex={2}
      sx={{
        display: { xs: "none", md: "block" },
        p: 2,
        width: "100%",
        height: `calc(100vh - ${appbarHeight}px)`,
      }}
    >
      <Box
        ref={rightbarRef}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            height: rightbarHeight,
            width: rightbarWidth,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" fontWeight={100}>
            Online Friends
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Rightbar;