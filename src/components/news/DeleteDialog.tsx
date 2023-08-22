import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { ReactNode } from "react";

export type Props = {
  open: boolean;
  onCancel: (() => void);
  onDelete: (() => void);
  isLoading: boolean;
  children: ReactNode;
};

const DeleteDialog: React.FC<Props> = ({ open, onCancel, onDelete, isLoading, children }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
          News-Eintrag löschen?
      </DialogTitle>
      <DialogContent>
        {isLoading && (
          <LinearProgress />
        )}
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>Abbrechen</Button>
        <Button onClick={onDelete} disabled={isLoading} autoFocus>Löschen</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;