import React, { useCallback } from "react";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import logger from "@/core/logger";
import { useRouter } from "next/router";

type ViewPrescriptionsProps = Pick<Props, "id"> & {
  handleClose: () => void;
};
const ViewPrescriptions: React.FC<ViewPrescriptionsProps> = ({
  id,
  handleClose,
}) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await router.push(`/meetings/user/${id}`);
    handleClose();
  }, []);

  return <MenuItem onClick={handleClick}>Termine anzeigen</MenuItem>;
};

export default ViewPrescriptions;
