import React, { useCallback } from "react";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import { useRouter } from "next/router";

type ViewAppointmentProps = Pick<Props, "id">;

const ViewAppointment: React.FC<ViewAppointmentProps> = ({ id }) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await router.push(`/meetings/${id}`);
  }, []);

  return <MenuItem onClick={handleClick}>Termin anzeigen</MenuItem>;
};

export default ViewAppointment;
