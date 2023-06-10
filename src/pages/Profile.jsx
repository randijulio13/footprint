import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewPostCard from "../components/NewPostCard";
import useUser from "../hooks/useUser";
import moment from "moment";
import {
  ChatBubble,
  Create,
  Draw,
  HowToReg,
  People,
  PersonAdd,
} from "@mui/icons-material";
import usePost from "../hooks/usePost";
import useAuth from "../hooks/useAuth";
import PostCard from "../components/PostCard";
import useFollow from "../hooks/useFollow";

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

  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getFollower(id).then((res) => {
      setFollower(res);
    });

    getFollowing(id).then((res) => {
      setFollowing(res);
    });
  }, [follows, id]);

  useEffect(() => {
    getUserPost(id).then((posts) => {
      setUserPosts(posts);
    });
  }, [posts, id]);

  useEffect(() => {
    getUser(id).then((user) => {
      setUserProfile(user);
    });
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

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 3 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <Card sx={{ width: "100%" }}>
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
              <Chip
                sx={{ pl: 1 }}
                icon={<Create fontSize="small" />}
                label={`${userPosts?.length} Posts`}
              />
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
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: "flex",
              justifyContent: "end",
              gap: 2,
              px: 4,
            }}
          >
            {id !== authUser.uid && (
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
                <Link to={`/chat/${id}`}>
                  <Button
                    startIcon={<ChatBubble />}
                    variant="contained"
                    size="small"
                  >
                    Chat
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
      {authUser.uid === id && <NewPostCard />}
      {userPosts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </Stack>
  );
};

export default Profile;
