import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, CardHeader, IconButton } from "@mui/material";
import moment from "moment";
import { Delete, DeleteOutline } from "@mui/icons-material";

export default function PostComments({
  postComments,
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
        {postComments.length === 0 && <Typography>No comment yet</Typography>}
      {postComments.map((comment) => {
        let deletAble =
          comment.uid === authUser.uid || comment.uid === user.uid;
        return (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Avatar src={comment.user.photoURL} />
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
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: (theme) => theme.palette.text.secondary, ml: 1 }}
                >
                  {moment(comment.createdAt?.toDate()).fromNow()}
                </Typography>
              </Box>
            </Box>
          </>
        );
      })}
    </Box>
  );
}
