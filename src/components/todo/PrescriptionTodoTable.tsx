import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CheckCircle, Clear, Edit } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { setRefetchPrescriptions } from "@/components/todo/todoSlice";
import Link from "@/components/common/Link";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import DeclinePrescriptionsDialog from "@/components/todo/DeclinePrescriptionsDialog";
import DeclineIcon from "@/components/todo/DeclineIcon";
import useDeletePrescription from "@/api/prescriptions/useDeletePrescription";
import { LIGHT_HEX_OPACITY } from "@/theme";
import CustomBadge from "@/components/todo/CustomBadge";

const PrescriptionTodoTable: React.FunctionComponent = () => {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<
    GetPrescriptionResponseV2[]
  >([]);
  const [declinePrescriptionsIsLoading, setDeclinePrescriptionsIsLoading] =
    useState(false);
  const [declinePrescriptionsIsSuccess, setDeclinePrescriptionsIsSuccess] =
    useState(false);
  const [declinePrescriptionsIsError, setDeclinePrescriptionsIsError] =
    useState(false);
  const [declinePrescriptionsDialogOpen, setDeclinePrescriptionsDialogOpen] =
    useState(false);

  const dispatch = useDispatch();
  const { prescriptions, prescriptionsTotalCount } = useSelector(
    (s: Store) => s.todo,
  );

  const { request: deletePrescription } = useDeletePrescription();

  useEffect(() => {
    if (!declinePrescriptionsIsSuccess && !declinePrescriptionsIsError) {
      return;
    }
    const timer = setTimeout(() => {
      setDeclinePrescriptionsIsSuccess(false);
      setDeclinePrescriptionsIsError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [declinePrescriptionsIsSuccess, declinePrescriptionsIsError]);

  const handleCheckboxClick = (user: GetPrescriptionResponseV2) => {
    const updatedSelectedUsers = [...selectedPrescriptions];
    const index = selectedPrescriptions.findIndex((su) => su.id === user.id);
    if (index > -1) {
      if (selectedPrescriptions.length === 1) {
        setSelectedPrescriptions([]);
        return;
      }

      updatedSelectedUsers.splice(index, 1);

      setSelectedPrescriptions(updatedSelectedUsers);
    } else {
      setSelectedPrescriptions([...updatedSelectedUsers, user]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPrescriptions.length > 0) {
      setSelectedPrescriptions([]);
    } else {
      setSelectedPrescriptions(prescriptions);
    }
  };

  const handleDeclinePrescriptions = (
    prescriptions: GetPrescriptionResponseV2[],
  ) => {
    setDeclinePrescriptionsIsSuccess(false);
    setDeclinePrescriptionsIsError(false);

    setDeclinePrescriptionsIsLoading(true);
    const promises: Promise<void>[] = [];
    prescriptions.forEach((prescription) => {
      if (!!prescription?.id) {
        promises.push(deletePrescription(prescription.id));
      }
    });

    Promise.all(promises)
      .then(() => setDeclinePrescriptionsIsSuccess(true))
      .catch(() => setDeclinePrescriptionsIsError(true))
      .finally(() => {
        setSelectedPrescriptions([]);
        dispatch(setRefetchPrescriptions(true));
        setDeclinePrescriptionsDialogOpen(false);
        setDeclinePrescriptionsIsLoading(false);
      });
  };

  const disabled = selectedPrescriptions.length === 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              <Link href="/prescriptions">
                <IconButton>
                  <LaunchIcon />
                </IconButton>
              </Link>
              <CustomBadge label={prescriptionsTotalCount ?? 0}>
                Rezepte
              </CustomBadge>
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() =>
                  !disabled && setDeclinePrescriptionsDialogOpen(true)
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                <DeclineIcon disabled={disabled} />
                <Typography variant="subtitle2">Auswahl ablehnen</Typography>
              </Stack>
            </Stack>
          </Stack>
          {declinePrescriptionsIsSuccess ? (
            <Alert
              icon={<CheckCircle fontSize="inherit" />}
              severity="success"
              action={
                <Clear
                  onClick={() => setDeclinePrescriptionsIsSuccess(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Rezepte erfolgreich abgelehnt.
            </Alert>
          ) : null}
          {declinePrescriptionsIsError ? (
            <Alert
              icon={<Clear fontSize="inherit" />}
              severity="error"
              action={
                <Clear
                  onClick={() => setDeclinePrescriptionsIsError(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Beim Ablehnen der Rezepte ist ein Fehler aufgetreten. Bitte
              überprüfen Sie Ihre Auswahl und versuchen Sie es erneut.
            </Alert>
          ) : null}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 400,
          }}
        >
          <Table aria-label="Rezepte To Do's">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-label": "Alle Rezepte auswählen",
                    }}
                    onClick={handleSelectAll}
                    checked={selectedPrescriptions.length > 0}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Notiz</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.map((row) => {
                const isSelected = !!selectedPrescriptions.find(
                  (prescription) => prescription.id === row.id,
                );
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: (theme) =>
                        isSelected
                          ? `${theme.palette.primary.main}${LIGHT_HEX_OPACITY}`
                          : undefined,
                    }}
                  >
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        color="primary"
                        inputProps={{
                          "aria-label": "Rezepte auswählen",
                        }}
                        onChange={() => handleCheckboxClick(row)}
                        checked={selectedPrescriptions.includes(row)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.patient?.firstName} {row.patient?.lastName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title={row.note}>
                        <Typography>{row.note}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link href={`/prescriptions/${row.id}`}>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing={8}>
                        <Box
                          onClick={() => {
                            setSelectedPrescriptions([row]);
                            setDeclinePrescriptionsDialogOpen(true);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <DeclineIcon />
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DeclinePrescriptionsDialog
          prescriptions={selectedPrescriptions}
          isOpen={declinePrescriptionsDialogOpen}
          setIsOpen={setDeclinePrescriptionsDialogOpen}
          callback={() => handleDeclinePrescriptions(selectedPrescriptions)}
          isLoading={declinePrescriptionsIsLoading}
          handleCheckboxClick={handleCheckboxClick}
        />
      </Grid>
    </Grid>
  );
};

export default PrescriptionTodoTable;
