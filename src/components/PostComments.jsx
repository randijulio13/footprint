import { DeleteOutline } from "@mui/icons-material";
import { Box, Collapse, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import UserAvatar from "./UserAvatar";
import { TransitionGroup } from "react-transition-group";
import usePostComment from "../hooks/usePostComment";

export default function PostComments({
  comments,
  authUser,
  user,
  deleteComment,
}) {
  const handleDeleteComment = (e, commentId) => {
    e.preventDefault();
    deleteComment(commentId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "70vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {comments?.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          <i>No comment yet</i>
        </Typography>
      )}
      <TransitionGroup>
        {comments?.map((comment) => {
          let deletAble =
            comment.uid === authUser.uid || user.uid === authUser.uid;
          return (
            <Collapse key={comment.id}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <UserAvatar {...comment.user} />
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      borderRadius: (theme) => theme.shape.borderRadius,
                      background: (theme) => theme.palette.divider,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography>{comment.user.name}</Typography>
                        <Typography variant="body1">
                          {comment?.comment}
                        </Typography>
                      </Box>
                      {deletAble && (
                        <IconButton
                          onClick={(e) => handleDeleteComment(e, comment.id)}
                          size="small"
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                          }}
                        >
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      ml: 1,
                    }}
                  >
                    {moment(comment.createdAt?.toDate()).fromNow()}
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </Box>
  );
}
