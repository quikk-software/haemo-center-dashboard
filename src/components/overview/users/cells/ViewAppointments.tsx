import React, { useCallback } from "react";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import { useRouter } from "next/router";

type ViewPrescriptionsProps = Pick<Props, "id">;
const ViewPrescriptions: React.FC<ViewPrescriptionsProps> = ({ id }) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await router.push(`/meetings/user/${id}`);
  }, []);

  return <MenuItem onClick={handleClick}>Termine anzeigen</MenuItem>;
};

export default ViewPrescriptions;
