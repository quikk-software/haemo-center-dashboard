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
import DialogContentText from "@mui/material/DialogContentText";
import { DATE_FORMAT, dayjs, TIME_FORMAT } from "@/dayjs/Dayjs";
import DeclineIcon from "@/components/todo/DeclineIcon";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

interface RejectMeetingsDialogProps {
  meetings: GetMeetingResponseV2[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  isLoading: boolean;
}

const RejectMeetingsDialog: React.FunctionComponent<
  RejectMeetingsDialogProps
> = ({ meetings, isOpen, setIsOpen, callback, isLoading }) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Auswahl bestätigen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Du bist dabei folgende Termine abzulehnen. Bitte bestätige diesen
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
                <Checkbox checked={true} />
              </Box>
              <ListItemText
                primary={`${meeting.patient?.firstName} ${meeting.patient?.lastName}`}
                secondary={`Am ${dayjs(meeting.date).format(DATE_FORMAT)}, ${dayjs(
                  meeting.startTime,
                ).format(TIME_FORMAT)} - ${dayjs(meeting.endTime).format(
                  TIME_FORMAT,
                )} bei ${meeting.professional?.firstName} ${meeting.professional?.lastName}`}
              />
              <DeclineIcon />
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

export default RejectMeetingsDialog;
