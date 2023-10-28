import React from "react";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";

type ViewPrescriptionsProps = Pick<Props, "id"> & {
  handleClose: () => void;
};
const ViewPrescriptions: React.FC<ViewPrescriptionsProps> = ({
  id,
  handleClose,
}) => {
  return <MenuItem>Rezepte anzeigen</MenuItem>;
};

export default ViewPrescriptions;
