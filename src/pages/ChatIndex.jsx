import { Box, Card, CardActionArea, CardContent, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ChatIndex() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { getListChat, chats } = useChat();
  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    getListChat(authUser.uid).then((res) => {
      setListChat(res);
    });
  }, [chats]);

  return (
    <Stack spacing={{ sm: 1, md: 2, lg: 4 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <Typography variant="h4" sx={{ mt: 2 }}>
        List Chat
      </Typography>
      {listChat.map((chat) => (
        <Card sx={{ width: "100%" }}>
          <CardActionArea onClick={() => navigate(`/chat/${chat.senderId}`)}>
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <Avatar src={chat.user.photoURL} />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h5">{chat.user.name}</Typography>
                  <Typography variant="subtitle1">{chat.chat}</Typography>
                </Box>
                <Typography variant="caption">
                  {moment(chat?.createdAt?.toDate()).fromNow()}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
