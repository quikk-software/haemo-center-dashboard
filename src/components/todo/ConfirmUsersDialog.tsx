import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { GetUserResponse } from "@/@types/user";
import DialogContentText from "@mui/material/DialogContentText";
import { DATE_FORMAT, dayjs } from "@/dayjs/Dayjs";
import CheckIcon from "@/components/todo/CheckIcon";

interface ConfirmUsersDialogProps {
  users: GetUserResponse[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  isLoading: boolean;
}

const ConfirmUserDialog: React.FunctionComponent<ConfirmUsersDialogProps> = ({
  users,
  isOpen,
  setIsOpen,
  callback,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Auswahl bestätigen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Du bist dabei folgende Nutzer zu verifizieren. Bitte bestätige diesen
          Vorgang.
        </DialogContentText>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Box
                sx={{
                  minWidth: "56px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Checkbox checked={true} />
              </Box>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={dayjs(user.birthDay).format(DATE_FORMAT)}
              />
              <CheckIcon />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Stack spacing={1} direction="row">
          <Button onClick={() => setIsOpen(false)}>Abbrechen</Button>
          <Button disabled={isLoading} onClick={callback}>
            Bestätigen
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUserDialog;
