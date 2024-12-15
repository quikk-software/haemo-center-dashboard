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
import { DATE_FORMAT, dayjs } from "@/dayjs/Dayjs";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import DeclineIcon from "@/components/todo/DeclineIcon";

interface DeclinePrescriptionsDialogProps {
  prescriptions: GetPrescriptionResponseV2[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  isLoading: boolean;
}

const DeclinePrescriptionsDialog: React.FunctionComponent<
  DeclinePrescriptionsDialogProps
> = ({ prescriptions, isOpen, setIsOpen, callback, isLoading }) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Auswahl bestätigen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Du bist dabei folgende Rezepte abzulehnen. Bitte bestätige diesen
          Vorgang.
        </DialogContentText>
        <List>
          {prescriptions.map((prescription) => (
            <ListItem key={prescription.id}>
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
                primary={`${prescription.patient?.firstName} ${prescription.patient?.lastName}`}
                secondary={dayjs(prescription.patient?.birthday).format(
                  DATE_FORMAT,
                )}
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

export default DeclinePrescriptionsDialog;
