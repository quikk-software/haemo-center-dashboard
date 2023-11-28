import React, { PropsWithChildren, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  active: boolean;
  onOk: (() => void) | (() => Promise<void>);
  onClose: () => void;
  okText: string;
  closeText: string;
  title: string;
  text: string;
};

const ActionConfirmer: React.FC<PropsWithChildren<Props>> = ({
  active,
  title,
  text,
  okText,
  closeText,
  onOk,
  onClose,
  children,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(active);
  }, [active]);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleOk = () => {
    onOk();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{closeText}</Button>
          <Button onClick={handleOk} autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
};

export default ActionConfirmer;
