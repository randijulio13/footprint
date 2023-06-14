import styled from "@emotion/styled";
import { ArrowBack, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import useElementHeight from "../hooks/useElementHeight";
import useUser from "../hooks/useUser";

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
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);

  const { authUser } = useAuth();
  const { users } = useUser();
  const {
    sendChat,
    getChat,
    chats: allChats,
    readMessage,
    chatRooms,
    getChatRoomMember,
  } = useChat();
  const [otherChatMember, setOtherChatMember] = useState([]);

  const appbarHeight = useElementHeight("appbar");
  const anchorRef = useRef();

  const navigate = useNavigate();

  const handleSendChat = async (e) => {
    e.preventDefault();
    await sendChat({
      senderId: authUser.uid,
      roomId: id,
      chat: chatText,
    });

    setChatText("");
    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let chatRoomMember = getChatRoomMember(id);
    let tmpMember = chatRoomMember?.filter(
      (member) => member.id !== authUser.uid
    );
    setOtherChatMember(tmpMember);
  }, [users, chatRooms, authUser, id]);

  useEffect(() => {
    getChat(id).then((res) => {
      setChats(res);
    });

    readMessage({ roomId: id });
  }, [allChats]);

  useEffect(() => {
    setTimeout(() => {
      anchorRef.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, []);

  return (
    <Stack
      spacing={{ sm: 1, md: 2, lg: 3 }}
      sx={{ p: { xs: 0, sm: 2 }, height: `calc(100dvh - ${appbarHeight}px)` }}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <IconButton onClick={(_) => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              {otherChatMember?.length === 1 ? (
                <>
                  <UserAvatar {...otherChatMember[0]} />
                  <Typography>{otherChatMember[0]?.name}</Typography>
                </>
              ) : (
                ""
              )}
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
              if (chat.senderId === authUser.uid) {
                return (
                  <Box
                    key={chat.id}
                    sx={{ display: "flex", gap: 2, ml: "auto" }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <BubbleChat>{chat.chat}</BubbleChat>
                      <Typography variant="caption" sx={{ textAlign: "right" }}>
                        {moment(chat?.createdAt.toDate()).fromNow()}
                      </Typography>
                    </Box>
                    {chats[index - 1]?.senderId !== chat.senderId ? (
                      <Avatar
                        src={authUser?.photoURL}
                        sx={{
                          visibility: () =>
                            chats[index - 1]?.senderId !== chat.senderId
                              ? "visible"
                              : "hidden",
                        }}
                      />
                    ) : (
                      <Box sx={{ ml: 5 }}></Box>
                    )}
                  </Box>
                );
              } else {
                let user = otherChatMember.find(
                  (member) => member.id === chat.senderId
                );
                return (
                  <Box
                    key={chat.id}
                    sx={{ display: "flex", gap: 2, mr: "auto" }}
                  >
                    <Avatar
                      src={user?.photoURL}
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
