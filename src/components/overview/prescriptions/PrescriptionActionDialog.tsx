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
import { DATE_FORMAT, dayjs } from "@/dayjs/Dayjs";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import DeclineIcon from "@/components/todo/DeclineIcon";

interface PrescriptionActionDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
  isLoading: boolean;
}

const PrescriptionActionDialog: React.FunctionComponent<
  PrescriptionActionDialogProps
> = ({ title, description, isOpen, setIsOpen, callback, isLoading }) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
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

export default PrescriptionActionDialog;
