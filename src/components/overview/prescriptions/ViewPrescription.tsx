import React, { useCallback } from "react";
import { MenuItem } from "@mui/material";
import { Props } from "@/components/overview/users/cells/MoreActionsButton";
import { useRouter } from "next/router";

type ViewPrescriptionProps = Pick<Props, "id">;

const ViewPrescription: React.FC<ViewPrescriptionProps> = ({ id }) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await router.push(`/prescriptions/${id}`);
  }, []);

  return <MenuItem onClick={handleClick}>Rezept anzeigen</MenuItem>;
};

export default ViewPrescription;
