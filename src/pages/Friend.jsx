import { ChatBubble, HowToReg, Person, PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import useFollow from "../hooks/useFollow";
import useUser from "../hooks/useUser";

const ListUser = ({ users }) => {
  const { isFollowing, followUser, unfollowUser } = useFollow();
  const { authUser } = useAuth();
  const { getChatRoom, createChatRoom } = useChat();
  const navigate = useNavigate();

  const handleChatButton = async (e, id) => {
    e.preventDefault();
    let res = await getChatRoom(id);
    if (!res) {
      res = await createChatRoom({ member: [id, authUser.uid] });
    }
    let roomId = res.id;
    navigate(`/chat/${roomId}`);
  };

  const handleFollowUser = async (id) => {
    await followUser(id);
  };

  const handleUnfollowUser = async (id) => {
    await unfollowUser(id);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.length === 0 && (
        <ListItem
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            <i>No Data</i>
          </Typography>
        </ListItem>
      )}
      {users.map((user) => {
        return (
          <Box key={user.id}>
            <ListItem
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.photoURL} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={(e) => handleChatButton(e, user.id)}
                  size="small"
                  variant="contained"
                  startIcon={<ChatBubble />}
                >
                  Chat
                </Button>
                <Link to={`/profile/${user.id}`}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Person />}
                  >
                    View Profile
                  </Button>
                </Link>
                {isFollowing(user.id) ? (
                  <Button
                    onClick={() => handleUnfollowUser(user.id)}
                    startIcon={<HowToReg />}
                    variant="outlined"
                    size="small"
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollowUser(user.id)}
                    startIcon={<PersonAdd />}
                    variant="contained"
                    size="small"
                  >
                    Follow
                  </Button>
                )}
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        );
      })}
    </List>
  );
};

export default function Friend() {
  const [tab, setTab] = useState("following");
  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const { users } = useUser();
  const {
    follows,
    getFollower,
    getFollowing,
    isFollowing,
    followUser,
    unfollowUser,
  } = useFollow();
  const { authUser } = useAuth();
  const { chats, getChatRoom, createChatRoom } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    setFollower(getFollower(authUser.uid));
    setFollowing(getFollowing(authUser.uid));
  }, [users, follows, authUser]);

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 4 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <Typography variant="h4" sx={{ mt: 2 }}>
        List Friends
      </Typography>
      <Card>
        <CardHeader
          title={
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Following" value="following" />
              <Tab label="Follower" value="follower" />
            </Tabs>
          }
        />
        <CardContent>
          <ListUser users={tab === "following" ? following : follower} />
        </CardContent>
      </Card>
    </Stack>
  );
}
