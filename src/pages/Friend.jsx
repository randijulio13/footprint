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
import useFollow from "../hooks/useFollow";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import { ChatBubble, HowToReg, Person, PersonAdd } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useChat from "../hooks/useChat";

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
          {tab === "following" ? (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {following.map((fllwing) => {
                return (
                  <>
                    <ListItem
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={fllwing.name} src={fllwing.photoURL} />
                      </ListItemAvatar>
                      <ListItemText primary={fllwing.name} />
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          onClick={(e) => handleChatButton(e, fllwing.id)}
                          size="small"
                          variant="contained"
                          startIcon={<ChatBubble />}
                        >
                          Chat
                        </Button>
                        <Link to={`/profile/${fllwing.id}`}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Person />}
                          >
                            View Profile
                          </Button>
                        </Link>
                        {isFollowing(fllwing.id) ? (
                          <Button
                            onClick={(_) => handleUnfollowUser(fllwing.id)}
                            startIcon={<HowToReg />}
                            variant="outlined"
                            size="small"
                          >
                            Following
                          </Button>
                        ) : (
                          <Button
                            onClick={(_) => handleFollowUser(fllwing.id)}
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
                  </>
                );
              })}
            </List>
          ) : (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {follower.map((fllwer) => {
                return (
                  <>
                    <ListItem
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={fllwer.name} src={fllwer.photoURL} />
                      </ListItemAvatar>
                      <ListItemText primary={fllwer.name} />
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          onClick={(e) => handleChatButton(e, fllwer.id)}
                          size="small"
                          variant="contained"
                          startIcon={<ChatBubble />}
                        >
                          Chat
                        </Button>
                        <Link to={`/profile/${fllwer.id}`}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Person />}
                          >
                            View Profile
                          </Button>
                        </Link>
                        {isFollowing(fllwer.id) ? (
                          <Button
                            onClick={(_) => handleUnfollowUser(fllwer.id)}
                            startIcon={<HowToReg />}
                            variant="outlined"
                            size="small"
                          >
                            Following
                          </Button>
                        ) : (
                          <Button
                            onClick={(_) => handleFollowUser(fllwer.id)}
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
                  </>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
