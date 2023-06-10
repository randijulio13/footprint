import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useElementHeight from "../hooks/useElementHeight";
import UserAvatar from "../components/UserAvatar";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import { ArrowBack, Send } from "@mui/icons-material";
import useChat from "../hooks/useChat";
import styled from "@emotion/styled";
import moment from "moment";

const BubbleChat = styled(Box)(({ theme }) => ({
  wordWrap: "break-word",
  width: "100%",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem 1rem",
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.divider,
}));

export default function Chat() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);

  const { authUser } = useAuth();
  const { users, getUser } = useUser();
  const { sendChat, getChat, chats: allChats } = useChat();
  const appbarHeight = useElementHeight("appbar");
  const anchorRef = useRef();

  const navigate = useNavigate();

  const handleSendChat = async (e) => {
    e.preventDefault();
    await sendChat({
      senderId: authUser.uid,
      receiverId: id,
      chat: chatText,
    });

    setChatText("");
    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getChat(id).then((res) => {
      setChats(res);
    });
  }, [allChats]);

  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res);
    });
  }, [id, users]);

  useEffect(() => {
    setTimeout(() => {
      anchorRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <Stack
      spacing={{ sm: 1, md: 2, lg: 3 }}
      sx={{ p: { xs: 0, sm: 2 }, height: `calc(100vh - ${appbarHeight}px)` }}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <IconButton onClick={(_) => navigate("/chat")}>
                <ArrowBack />
              </IconButton>
              <UserAvatar {...user} />
              <Typography>{user?.name}</Typography>
            </Box>
          }
        />
        <CardContent
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              gap: 2,
            }}
          >
            {chats.map((chat, index) => {
              if (id === chat.senderId) {
                return (
                  <Box
                    key={chat.id}
                    sx={{ display: "flex", gap: 1, mr: "auto" }}
                  >
                    <Avatar
                      src={user.photoURL}
                      sx={{
                        visibility: () =>
                          chats[index - 1]?.senderId !== chat.senderId
                            ? "visible"
                            : "hidden",
                      }}
                    />
                    <Box sx={{ width: "100%" }}>
                      <BubbleChat>{chat.chat}</BubbleChat>
                      <Typography variant="caption">
                        {moment(chat?.createdAt.toDate()).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={chat.id}
                    sx={{ display: "flex", gap: 1, ml: "auto" }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <BubbleChat>{chat.chat}</BubbleChat>
                      <Typography variant="caption">
                        {moment(chat?.createdAt.toDate()).fromNow()}
                      </Typography>
                    </Box>
                    {chats[index - 1]?.receiverId !== chat.receiverId ? (
                      <Avatar
                        src={authUser.photoURL}
                        sx={{
                          visibility: () =>
                            chats[index - 1]?.receiverId !== chat.receiverId
                              ? "visible"
                              : "hidden",
                        }}
                      />
                    ) : (
                      <Box sx={{ ml: 5 }}></Box>
                    )}
                  </Box>
                );
              }
            })}
            <Box ref={anchorRef}></Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            onSubmit={handleSendChat}
            component="form"
            sx={{
              px: 1,
              py: 2,
              display: "flex",
              gap: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <UserAvatar {...authUser} />
            <TextField
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              sx={{ flexGrow: 1 }}
              size="small"
              variant="filled"
              label="Write a comment"
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" disabled={chatText === ""}>
                    <Send />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </CardActions>
      </Card>
    </Stack>
  );
}
