import React from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PersonAdd, Search } from "@mui/icons-material";

const ChatList: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        width: "30%",
      }}
    >
      <Card>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                Chats
              </Typography>
              <IconButton>
                <PersonAdd />
              </IconButton>
            </Stack>
            <TextField
              size={"small"}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Suche"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatList;
