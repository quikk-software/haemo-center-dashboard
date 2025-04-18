import React, { useEffect, useState } from "react";
import useQuery from "@/utils/useQuery";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useUpdatePrescription } from "@/api/prescriptions/useUpdatePrescription";
import { useGetPrescription } from "@/api/prescriptions/useGetPrescription";
import { useRouter } from "next/router";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
import { useDeletePrescriptionV2 } from "@/api/prescriptions/useDeletePrescriptionV2";
import PrescriptionActionDialog from "@/components/overview/prescriptions/PrescriptionActionDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const PrescriptionDetail: React.FunctionComponent = () => {
  const [preparation, setPreparation] = useState<string | undefined>(undefined);
  const [dosage, setDosage] = useState<string | undefined>(undefined);
  const [rejectPrescriptionsDialogOpen, setRejectPrescriptionsDialogOpen] =
    useState(false);
  const [deletePrescriptionsDialogOpen, setDeletePrescriptionsDialogOpen] =
    useState(false);
  const [acceptPrescriptionDialogOpen, setAcceptPrescriptionDialogOpen] =
    useState(false);

  const prescriptionId = useQuery("id");
  const router = useRouter();
  const { displaySuccess, displayError } = useSnackbarComponent();

  const { fetch, data: prescription, isLoading } = useGetPrescription();
  const { mutate: updatePrescription, isLoading: updatePrescriptionIsLoading } =
    useUpdatePrescription();
  const {
    mutate: deletePrescription,
    isSuccess: deletePrescriptionIsSuccess,
    isLoading: deletePrescriptionIsLoading,
  } = useDeletePrescriptionV2();

  useEffect(() => {
    fetch(Number(prescriptionId));
  }, [prescriptionId]);

  useEffect(() => {
    setPreparation(prescription?.preparation);
  }, [prescription?.preparation]);

  useEffect(() => {
    setDosage(prescription?.dosage);
  }, [prescription?.dosage]);

  if (isLoading) {
    return <>Lädt...</>;
  }

  if (!prescription) {
    return (
      <>
        Das Rezept mit der Nummer {prescriptionId} konnte nicht geladen werden.
      </>
    );
  }

  const handleRejectPrescriptionClick = () => {
    deletePrescription(Number(prescriptionId), true)
      .then(() => {
        displaySuccess("Rezept erfolgreich abgelehnt!");
        router.back();
      })
      .catch(() => displayError("Rezept konnte nicht abgelehnt werden!"));
  };

  const handleDeletePrescriptionClick = () => {
    deletePrescription(Number(prescriptionId), false)
      .then(() => {
        displaySuccess("Rezept erfolgreich gelöscht!");
        router.back();
      })
      .catch(() => displayError("Rezept konnte nicht gelöscht werden!"));
  };

  const acceptIsDisabled = !preparation || !dosage || prescription.isAccepted;
  const rejectIsDisabled = prescription.isAccepted;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography variant="h3">Rezeptdetails</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Button
          startIcon={<Delete />}
          color={"inherit"}
          disabled={deletePrescriptionIsLoading || deletePrescriptionIsSuccess}
          onClick={() => setDeletePrescriptionsDialogOpen(true)}
        >
          Rezept löschen
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Patient</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Patient"
                  defaultValue={`${prescription.patient?.firstName} ${prescription.patient?.lastName}`.trim()}
                  value={`${prescription.patient?.firstName} ${prescription.patient?.lastName}}`.trim()}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Größe"
                  value={prescription.bodyHeight}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gewicht"
                  value={prescription.bodyWeight}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Präparat</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Patient"
                  defaultValue={`${prescription.professional?.firstName} ${prescription.professional?.lastName}}`.trim()}
                  value={`${prescription.professional?.firstName} ${prescription.professional?.lastName}}`.trim()}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Präparat"
                  defaultValue={prescription.preparation}
                  value={preparation}
                  fullWidth
                  onChange={(e) => setPreparation(e.target.value ?? undefined)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Dosierung"
                  defaultValue={prescription.dosage}
                  value={dosage}
                  fullWidth
                  onChange={(e) => setDosage(e.target.value ?? undefined)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notiz"
                  value={prescription.note}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={acceptIsDisabled}
                  onClick={() => setAcceptPrescriptionDialogOpen(true)}
                >
                  Freigeben
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  disabled={rejectIsDisabled}
                  onClick={() => setRejectPrescriptionsDialogOpen(true)}
                >
                  Ablehnen
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <ConfirmDialog
          isOpen={acceptPrescriptionDialogOpen}
          setIsOpen={setAcceptPrescriptionDialogOpen}
          title="Rezept freigeben"
          description="Du bist dabei folgendes Rezept freizugeben. Bitte bestätige diesen Vorgang."
          isLoading={updatePrescriptionIsLoading}
          callback={() =>
            updatePrescription({
              preparation: preparation?.trim() ?? "",
              dosage: dosage?.trim() ?? "",
              risk: "",
              dosageUnit: "",
              prescriptionId: Number(prescriptionId),
            })
              .then(() => {
                displaySuccess("Rezept erfolgreich freigegeben!");
                router.back();
              })
              .catch(() =>
                displayError("Rezept konnte nicht freigegeben werden!"),
              )
          }
        />
        <PrescriptionActionDialog
          title="Rezept ablehnen"
          description="Du bist dabei folgendes Rezept abzulehnen. Bitte bestätige diesen Vorgang."
          isOpen={rejectPrescriptionsDialogOpen}
          setIsOpen={setRejectPrescriptionsDialogOpen}
          callback={handleRejectPrescriptionClick}
          isLoading={updatePrescriptionIsLoading}
        />
        <PrescriptionActionDialog
          title="Rezept löschen"
          description="Du bist dabei folgendes Rezept zu löschen. Bitte bestätige diesen Vorgang."
          isOpen={deletePrescriptionsDialogOpen}
          setIsOpen={setDeletePrescriptionsDialogOpen}
          callback={handleDeletePrescriptionClick}
          isLoading={deletePrescriptionIsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default PrescriptionDetail;
