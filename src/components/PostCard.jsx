import {
  ChatBubble,
  ChatBubbleOutline,
  Delete,
  Favorite,
  FavoriteBorder,
  Send as SendIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Checkbox,
  Collapse,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import usePostComment from "../hooks/usePostComment";
import usePostLike from "../hooks/usePostLike";
import PostComments from "./PostComments";
import UserAvatar from "./UserAvatar";
import usePost from "../hooks/usePost";

export const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
  },
}));

export default function PostCard({ id, post, image = null, user, createdAt }) {
  const { likePost, unlikePost, postLikes, deleteLikes, getPostLikes } =
    usePostLike(id);
  const {
    addComment,
    postComments,
    deleteComment,
    deleteComments,
    getPostComments,
  } = usePostComment(id);
  const { deletePost } = usePost();
  const { authUser } = useAuth();

  const [expanded, setExpanded] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getPostComments().then((cmmnts) => {
      setComments(cmmnts);
    });
  }, [id, postComments]);

  useEffect(() => {
    getPostLikes().then((lks) => {
      setLikes(lks);
    });
  }, [id, postLikes]);

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

    addComment({
      comment,
      uid: authUser.uid,
    });
    setComment("");
    setExpanded(true);
  };

  useEffect(() => {
    setIsLiked(!!likes.find((post) => post.uid === authUser.uid));
  }, [user, likes]);

  return (
    <StyledCard sx={{ marginY: 4 }}>
      <CardHeader
        avatar={<UserAvatar {...user} />}
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
                {likes.length}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {expanded ? <ChatBubble /> : <ChatBubbleOutline />}
                </IconButton>
                {comments.length}
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
            <UserAvatar {...authUser} />

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
          <PostComments {...{ comments, authUser, user, deleteComment }} />
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}
