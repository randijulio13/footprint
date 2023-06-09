import {
  BorderStyle,
  ChatBubble,
  ChatBubbleOutline,
  Comment,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Send as SendIcon, Share as ShareIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import usePostLike from "../hooks/usePostLike";
import usePostComment from "../hooks/usePostComment";
import { useEffect } from "react";
import PostComments from "./PostComments";

export const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
  },
}));

export default function PostCard({
  id,
  post,
  image = null,
  user,
  createdAt,
  deletePost,
  uid,
}) {
  const [expanded, setExpanded] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { likePost, unlikePost, postLikes, deleteLikes } = usePostLike(id);
  const { commentPost, postComments, deleteComment, deleteComments } =
    usePostComment(id);

  const [comment, setComment] = useState("");

  const { authUser } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleDeletePost = () => {
    setAnchorMenu(null);
    deletePost(id);
    deleteLikes();
    deleteComments();
  };

  const handleLikePost = (e) => {
    let isChecked = e.target.checked;

    if (isChecked) {
      likePost(authUser.uid, id);
    } else {
      unlikePost(authUser.uid, id);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    commentPost({
      comment,
      uid: authUser.uid,
    });
    setComment("");
    setExpanded(true);
  };

  useEffect(() => {
    setIsLiked(!!postLikes.find((post) => post.uid === authUser.uid));
  }, [user, postLikes]);

  return (
    <StyledCard sx={{ marginY: 4 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={user?.photoURL} />}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              PaperProps={{
                sx: { width: 200 },
              }}
              open={Boolean(anchorMenu)}
              anchorEl={anchorMenu}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleDeletePost}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        title={<Typography>{user?.name}</Typography>}
        subheader={
          <Typography
            variant="caption"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            {moment(createdAt?.toDate()).fromNow()}
          </Typography>
        }
      />
      {image && (
        <CardMedia
          height="20%"
          component="img"
          image={image}
          alt={user?.name}
        />
      )}
      <CardContent sx={{ py: 1 }}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {post}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "between",
              m: 0,
              borderBottomWidth: "1px",
              borderBottomColor: (theme) => theme.palette.divider,
              borderBottomStyle: "solid",
              pb: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: red[500],
                    },
                  }}
                  onChange={handleLikePost}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={isLiked}
                />
                {postLikes.length}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {expanded ? <ChatBubble /> : <ChatBubbleOutline />}
                </IconButton>
                {postComments.length}
              </Box>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmitComment}
            sx={{ px: 1, py: 2, display: "flex", gap: 2 }}
          >
            <Avatar src={authUser?.photoURL} sx={{ alignSelf: "center" }} />
            <TextField
              sx={{ flexGrow: 1 }}
              size="small"
              variant="filled"
              label="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" disabled={comment === ""}>
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 0 }}>
          <PostComments {...{ postComments, authUser, user, deleteComment }} />
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}
