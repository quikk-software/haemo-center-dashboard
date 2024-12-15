import React, { useEffect } from "react";
import useQuery from "@/utils/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import logger from "@/core/logger";
import { setPrescription } from "@/components/overview/prescriptions/prescriptionSlice";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { theme } from "@/theme";
import useUpdatePrescription from "@/api/prescriptions/useUpdatePrescription";
import { produce } from "immer";
import { PatchPrescriptionRequest } from "@/@types/prescription";
import {
  useResolvePrescriptionProfessionalName,
  useResolvePrescriptionPatientName,
} from "@/api/prescriptions/useResolvePrescriptionUserName";

const PrescriptionDetail: React.FunctionComponent = () => {
  const id = useQuery("id");
  const dispatch = useDispatch();

  const { request: patientNameRequest } = useResolvePrescriptionPatientName();
  const { request: professionalNameRequest } =
    useResolvePrescriptionProfessionalName();

  const {
    prescriptionPatientName,
    prescriptionProfessionalName,
    prescription,
    prescriptions,
    allPrescriptions,
  } = useSelector((store: Store) => store.prescriptions);

  useEffect(() => {
    if (!prescription) {
      return;
    }
    patientNameRequest(String(prescription.patientId));
    professionalNameRequest(String(prescription.professionalId));
    dispatch(setPrescription(prescription));
  }, [dispatch, prescription]);

  const updatePrescription = (
    updatedPrescription: Partial<PatchPrescriptionRequest>,
  ) => {
    if (!prescription) {
      logger.debug(
        "Prescription does not exist. Cannot update prescription details.",
      );
      return;
    }

    const nextPrescription = produce(prescription, (draft) => {
      Object.keys(updatedPrescription).forEach(
        // @ts-ignore
        (key) => (draft[key] = updatedPrescription[key]),
      );
    });
    dispatch(setPrescription(nextPrescription));
  };

  const { request } = useUpdatePrescription();

  useEffect(() => {
    // Prescription Id is always a number

    const prescriptionCandidate = [...prescriptions, ...allPrescriptions].find(
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

  if (!prescription) {
    return <>Das Rezept mit der Nummer {id} konnte nicht geladen werden.</>;
  }

  const { preparation, dosage, bodyWeight, bodyHeight, note } = prescription;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color={theme.palette.text.primary}>
          Rezeptdetails
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Patient
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {prescriptionPatientName !== null && (
          <TextField
            label="Patient"
            defaultValue={prescriptionPatientName}
            value={prescriptionPatientName}
            fullWidth
            disabled
          />
        )}
      </Grid>
      <Grid item xs={6}>
        <TextField label="Größe" value={bodyHeight} fullWidth disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Gewicht" value={bodyWeight} fullWidth disabled />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Präparat
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {prescriptionProfessionalName !== null && (
          <TextField
            label="Arzt"
            value={prescriptionProfessionalName}
            fullWidth
            disabled
          />
        )}
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Präparat"
          value={preparation}
          fullWidth
          onChange={(e) => updatePrescription({ preparation: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Dosierung"
          value={dosage}
          fullWidth
          onChange={(e) => updatePrescription({ dosage: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Notiz" value={note} fullWidth disabled />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() =>
            request({
              preparation: preparation ?? "",
              dosage: dosage ?? "",
              dosageUnit: "",
              risk: "",
              ...prescription,
              prescriptionId: Number(id),
            })
          }
        >
          Speichern
        </Button>
      </Grid>
    </Grid>
  );
};

export default PrescriptionDetail;
