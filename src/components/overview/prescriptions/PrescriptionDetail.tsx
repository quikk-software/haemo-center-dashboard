import React, { useEffect } from "react";
import useQuery from "@/utils/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import logger from "@/core/logger";
import { setPrescription } from "@/components/overview/prescriptions/prescriptionSlice";

const PrescriptionDetail: React.FC = () => {
  const id = useQuery("id");
  const dispatch = useDispatch();

  const { prescription, prescriptions } = useSelector(
    (store: Store) => store.prescriptions,
  );

  useEffect(() => {
    // Meeting Id is always a number

    const prescriptionCandidate = prescriptions.find(
      (m) => m.id === Number(id),
    );
    if (id !== undefined && prescriptionCandidate !== undefined) {
      dispatch(setPrescription(prescriptionCandidate));
    } else {
      logger.error(
        "No prescriptions stored. Please access prescriptions first.",
      );
    }
  }, []);

  return (
    <>
      {id}
      {prescription ? prescription.id : "..."}
    </>
  );
};

export default PrescriptionDetail;
