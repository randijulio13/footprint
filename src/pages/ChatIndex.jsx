import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

export default function ChatIndex() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { getUserChatRooms, getNewMessage, chats } = useChat();
  const [listChat, setListChat] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    getUserChatRooms(authUser.uid).then((res) => {
      setListChat(res);
    });

    let tmpNewMessage = getNewMessage(authUser.uid);
    setNewMessage(tmpNewMessage);
  }, [chats]);

  return (
    <Stack spacing={{ sm: 1, md: 2 }} sx={{ p: { xs: 0, sm: 2 } }}>
      <Typography variant="h4" sx={{ mt: 2 }}>
        List Chats
      </Typography>
      {listChat.map((chat) => {
        let individualNewMessage = newMessage?.filter((newMsg) => {
          return (
            newMsg.senderId !== authUser.uid &&
            newMsg.senderId === chat.latestMessage.senderId
          );
        });

        return (
          <Card sx={{ width: "100%" }} key={chat.roomId}>
            <CardActionArea onClick={() => navigate(`/chat/${chat?.roomId}`)}>
              <CardContent sx={{ display: "flex", gap: 2 }}>
                {chat.member.length === 1 ? (
                  <>
                    <Badge
                      color="primary"
                      badgeContent={individualNewMessage.length}
                    >
                      <Avatar src={chat.member[0].photoURL} />
                    </Badge>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h5">
                          {chat?.member[0].name}
                        </Typography>

                        {chat.latestMessage ? (
                          <Typography variant="subtitle1">
                            {chat.latestMessage.senderId === authUser.uid && (
                              <i>(you)</i>
                            )}{" "}
                            {chat?.latestMessage.chat}
                          </Typography>
                        ) : (
                          <Typography variant="subtitle1">
                            <i>Empty chat room</i>
                          </Typography>
                        )}
                      </Box>
                      {chat.latestMessage && (
                        <Typography variant="caption">
                          {moment(
                            chat?.latestMessage?.createdAt?.toDate()
                          ).fromNow()}
                        </Typography>
                      )}
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
}
