import React from "react";
import ChatList from "@/components/chat/ChatList";
import { Box } from "@mui/material";
import ChatHistory from "@/components/chat/ChatHistory";

const ChatOverview: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
      }}
    >
      <ChatList />
      <ChatHistory />
    </Box>
  );
};

export default ChatOverview;
