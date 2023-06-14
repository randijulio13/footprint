import {
  ChatBubble,
  Create,
  HowToReg,
  People,
  PersonAdd,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewPostCard from "../components/NewPostCard";
import PostCard from "../components/PostCard";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import useFollow from "../hooks/useFollow";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";
import { TransitionGroup } from "react-transition-group";

const Profile = () => {
  let { id } = useParams();
  const { authUser } = useAuth();
  const { users, getUser } = useUser();
  const { getUserPost, posts } = usePost();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const {
    follows,
    isFollowing,
    followUser,
    unfollowUser,
    getFollower,
    getFollowing,
  } = useFollow();

  const { chats, getChatRoom, createChatRoom } = useChat();

  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFollower(getFollower(id));
    setFollowing(getFollowing(id));
  }, [follows, id]);

  useEffect(() => {
    getUserPost(id).then((posts) => {
      setUserPosts(posts);
    });
  }, [posts, id]);

  useEffect(() => {
    let user = getUser(id);
    setUserProfile(user);
  }, [users, id]);

  useEffect(() => {
    if (userProfile) {
    }
  }, [userProfile]);

  const handleFollowUser = async () => {
    await followUser(id);
  };

  const handleUnfollowUser = async () => {
    await unfollowUser(id);
  };

  const handleChatButton = async (e, id) => {
    e.preventDefault();
    let res = await getChatRoom(id);
    if (!res) {
      res = await createChatRoom({ member: [id, authUser.uid] });
    }
    let roomId = res.id;
    navigate(`/chat/${roomId}`);
  };

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 3 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <Card sx={{ mb: { xs: 4, sm: 0 } }}>
        <CardMedia
          component="img"
          height="250"
          image="https://picsum.photos/1920/1080"
        />
        <CardContent sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={userProfile?.photoURL}
            sx={{
              width: 96,
              height: 96,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }} variant="h5">
              {userProfile?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              Joined on{" "}
              {moment(userProfile?.createdAt?.toDate()).format("Do MMMM YYYY")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {/* <Chip
                sx={{ pl: 1 }}
                icon={<Create fontSize="small" />}
                label={`${userPosts?.length} Posts`}
              /> */}
              <Chip
                sx={{ pl: 1 }}
                icon={<People fontSize="small" />}
                label={`${following.length} Following`}
              />
              <Chip
                sx={{ pl: 1 }}
                icon={<People fontSize="small" />}
                label={`${follower.length} Follower`}
              />
            </Box>
          </Box>
          {id !== authUser.uid && (
            <Box
              sx={{
                flexGrow: 1,
                alignItems: "center",
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
                gap: 2,
                px: 4,
              }}
            >
              <>
                {isFollowing(id) ? (
                  <Button
                    onClick={handleUnfollowUser}
                    startIcon={<HowToReg />}
                    variant="outlined"
                    size="small"
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    onClick={handleFollowUser}
                    startIcon={<PersonAdd />}
                    variant="contained"
                    size="small"
                  >
                    Follow
                  </Button>
                )}

                <Button
                  onClick={(e) => handleChatButton(e, id)}
                  startIcon={<ChatBubble />}
                  variant="contained"
                  size="small"
                >
                  Chat
                </Button>
              </>
            </Box>
          )}
        </CardContent>
        {id !== authUser.uid && (
          <CardActions sx={{ display: { xs: "flex", md: "none" }, m: 1 }}>
            {isFollowing(id) ? (
              <Button
                sx={{ flexGrow: 1 }}
                onClick={handleUnfollowUser}
                startIcon={<HowToReg />}
                variant="outlined"
                size="small"
              >
                Following
              </Button>
            ) : (
              <Button
                sx={{ flexGrow: 1 }}
                onClick={handleFollowUser}
                startIcon={<PersonAdd />}
                variant="contained"
                size="small"
              >
                Follow
              </Button>
            )}
            <Button
              sx={{ flexGrow: 1 }}
              onClick={(e) => handleChatButton(e, id)}
              startIcon={<ChatBubble />}
              variant="contained"
              size="small"
            >
              Chat
            </Button>
          </CardActions>
        )}
      </Card>
      {authUser.uid === id && <NewPostCard />}
      <TransitionGroup>
        {userPosts.map((post) => {
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

export default Profile;
