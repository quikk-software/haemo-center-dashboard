import React, { useEffect } from "react";
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
import DialogContentText from "@mui/material/DialogContentText";
import { DATE_FORMAT, dayjs, TIME_FORMAT } from "@/dayjs/Dayjs";
import CheckIcon from "@/components/todo/CheckIcon";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

interface AcceptMeetingsDialogProps {
  meetings: GetMeetingResponseV2[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  isLoading: boolean;
  handleCheckboxClick: (user: GetMeetingResponseV2) => void;
}

const AcceptMeetingsDialog: React.FunctionComponent<
  AcceptMeetingsDialogProps
> = ({
  meetings,
  isOpen,
  setIsOpen,
  callback,
  isLoading,
  handleCheckboxClick,
}) => {
  useEffect(() => {
    if (meetings.length === 0) {
      setIsOpen(false);
    }
  }, [meetings, setIsOpen]);

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Auswahl bestätigen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Du bist dabei folgende Termine zu bestätigen. Bitte bestätige diesen
          Vorgang.
        </DialogContentText>
        <List>
          {meetings.map((meeting) => (
            <ListItem key={meeting.id}>
              <Box
                sx={{
                  minWidth: "56px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Checkbox
                  checked={true}
                  onClick={() => handleCheckboxClick(meeting)}
                />
              </Box>
              <ListItemText
                primary={`${meeting.patient?.firstName} ${meeting.patient?.lastName}`}
                secondary={`Am ${dayjs(meeting.date).format(DATE_FORMAT)}, ${dayjs(
                  meeting.startTime,
                ).format(TIME_FORMAT)} - ${dayjs(meeting.endTime).format(
                  TIME_FORMAT,
                )} bei ${meeting.professional?.firstName} ${meeting.professional?.lastName}`}
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

export default AcceptMeetingsDialog;
