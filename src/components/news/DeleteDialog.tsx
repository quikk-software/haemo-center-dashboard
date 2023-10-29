import useLanguage from "@/i18n/useLanguage";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { ReactNode } from "react";

export type Props = {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
  isLoading: boolean;
  children: ReactNode;
};

const DeleteDialog: React.FC<Props> = ({
  open,
  onCancel,
  onDelete,
  isLoading,
  children,
}) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{t("news:deleteDialog.title")}</DialogTitle>
      <DialogContent>
        {isLoading && <LinearProgress />}
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          {t("news:deleteDialog.cancelButton")}
        </Button>
        <Button onClick={onDelete} disabled={isLoading} autoFocus>
          {t("news:deleteDialog.deleteButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
