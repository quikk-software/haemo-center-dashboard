import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
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
import CheckIcon from "@/components/todo/CheckIcon";
import LaunchIcon from "@mui/icons-material/Launch";
import { setRefetchMeetings } from "@/components/todo/todoSlice";
import Link from "@/components/common/Link";
import { GetMeetingResponseV2 } from "@/@types/scheduling";
import DeclineIcon from "@/components/todo/DeclineIcon";
import useUpdateMeetingState from "@/api/scheduling/useUpdateMeetingState";
import { DATE_FORMAT, dayjs, TIME_FORMAT } from "@/dayjs/Dayjs";
import AcceptMeetingsDialog from "@/components/todo/AcceptMeetingsDialog";
import RejectMeetingsDialog from "@/components/todo/RejectMeetingsDialog";
import { LIGHT_HEX_OPACITY } from "@/theme";

const MeetingTodoTable: React.FunctionComponent = () => {
  const [selectedMeetings, setSelectedMeetings] = useState<
    GetMeetingResponseV2[]
  >([]);
  const [acceptMeetingsIsLoading, setAcceptMeetingsIsLoading] = useState(false);
  const [rejectMeetingsIsLoading, setRejectMeetingsIsLoading] = useState(false);
  const [acceptMeetingsIsSuccess, setAcceptMeetingsIsSuccess] = useState(false);
  const [rejectMeetingsIsSuccess, setRejectMeetingsIsSuccess] = useState(false);
  const [acceptMeetingsIsError, setAcceptMeetingsIsError] = useState(false);
  const [rejectMeetingsIsError, setRejectMeetingsIsError] = useState(false);
  const [acceptMeetingsDialogOpen, setAcceptMeetingsDialogOpen] =
    useState(false);
  const [rejectMeetingsDialogOpen, setRejectMeetingsDialogOpen] =
    useState(false);

  const dispatch = useDispatch();
  const { meetings } = useSelector((s: Store) => s.todo);

  const { request: updateMeeting } = useUpdateMeetingState();

  useEffect(() => {
    if (!acceptMeetingsIsSuccess && !acceptMeetingsIsError) {
      return;
    }
    const timer = setTimeout(() => {
      setAcceptMeetingsIsSuccess(false);
      setAcceptMeetingsIsError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [acceptMeetingsIsSuccess, acceptMeetingsIsError]);

  useEffect(() => {
    if (!rejectMeetingsIsSuccess && !rejectMeetingsIsError) {
      return;
    }
    const timer = setTimeout(() => {
      setRejectMeetingsIsSuccess(false);
      setRejectMeetingsIsError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [rejectMeetingsIsSuccess, rejectMeetingsIsError]);

  const handleCheckboxClick = (user: GetMeetingResponseV2) => {
    const updatedSelectedUsers = [...selectedMeetings];
    const index = selectedMeetings.findIndex((su) => su.id === user.id);
    if (index > -1) {
      if (selectedMeetings.length === 1) {
        setSelectedMeetings([]);
        return;
      }

      updatedSelectedUsers.splice(index, 1);

      setSelectedMeetings(updatedSelectedUsers);
    } else {
      setSelectedMeetings([...updatedSelectedUsers, user]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMeetings.length > 0) {
      setSelectedMeetings([]);
    } else {
      setSelectedMeetings(meetings);
    }
  };

  const handleAcceptMeetingsState = (meetings: GetMeetingResponseV2[]) => {
    setAcceptMeetingsIsSuccess(false);
    setAcceptMeetingsIsError(false);

    setAcceptMeetingsIsLoading(true);
    const promises: Promise<void>[] = [];
    meetings.forEach((meeting) => {
      if (!!meeting?.id) {
        promises.push(updateMeeting(meeting.id, "ACCEPTED"));
      }
    });

    Promise.all(promises)
      .then(() => setAcceptMeetingsIsSuccess(true))
      .catch(() => setAcceptMeetingsIsError(true))
      .finally(() => {
        setSelectedMeetings([]);
        dispatch(setRefetchMeetings(true));
        setAcceptMeetingsDialogOpen(false);
        setAcceptMeetingsIsLoading(false);
      });
  };

  const handleRejectMeetingsState = (meetings: GetMeetingResponseV2[]) => {
    setRejectMeetingsIsSuccess(false);
    setRejectMeetingsIsError(false);

    setRejectMeetingsIsLoading(true);
    const promises: Promise<void>[] = [];
    meetings.forEach((meeting) => {
      if (!!meeting?.id) {
        promises.push(updateMeeting(meeting.id));
      }
    });

    Promise.all(promises)
      .then(() => setRejectMeetingsIsSuccess(true))
      .catch(() => setRejectMeetingsIsError(true))
      .finally(() => {
        setSelectedMeetings([]);
        dispatch(setRefetchMeetings(true));
        setRejectMeetingsDialogOpen(false);
        setRejectMeetingsIsLoading(false);
      });
  };

  const disabled = selectedMeetings.length === 0;

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
              <Link href="/meetings">
                <IconButton>
                  <LaunchIcon />
                </IconButton>
              </Link>
              Termine
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() => !disabled && setAcceptMeetingsDialogOpen(true)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <CheckIcon disabled={disabled} />
                <Typography variant="subtitle2">Auswahl akzeptieren</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() => !disabled && setRejectMeetingsDialogOpen(true)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <DeclineIcon disabled={disabled} />
                <Typography variant="subtitle2">Auswahl ablehnen</Typography>
              </Stack>
            </Stack>
          </Stack>
          {rejectMeetingsIsSuccess ? (
            <Alert
              icon={<CheckCircle fontSize="inherit" />}
              severity="success"
              action={
                <Clear
                  onClick={() => setRejectMeetingsIsSuccess(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Termine erfolgreich abgelehnt.
            </Alert>
          ) : null}
          {rejectMeetingsIsError ? (
            <Alert
              icon={<Clear fontSize="inherit" />}
              severity="error"
              action={
                <Clear
                  onClick={() => setRejectMeetingsIsError(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Beim Ablehnen der Termine ist ein Fehler aufgetreten. Bitte
              überprüfen Sie Ihre Auswahl und versuchen Sie es erneut.
            </Alert>
          ) : null}
          {acceptMeetingsIsSuccess ? (
            <Alert
              icon={<CheckCircle fontSize="inherit" />}
              severity="success"
              action={
                <Clear
                  onClick={() => setRejectMeetingsIsSuccess(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Termin erfolgreich angenommen.
            </Alert>
          ) : null}
          {acceptMeetingsIsError ? (
            <Alert
              icon={<Clear fontSize="inherit" />}
              severity="error"
              action={
                <Clear
                  onClick={() => setRejectMeetingsIsError(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Beim Annehmen der Termine ist ein Fehler aufgetreten. Bitte
              überprüfen Sie Ihre Auswahl und versuchen Sie es erneut.
            </Alert>
          ) : null}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Termine To Do's">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-label": "Alle Termine auswählen",
                    }}
                    onClick={handleSelectAll}
                    checked={selectedMeetings.length > 0}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Arzt</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Termindetails</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings.map((row) => {
                const isSelected = !!selectedMeetings.find(
                  (meeting) => meeting.id === row.id,
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
                          "aria-label": "Termine auswählen",
                        }}
                        onChange={() => handleCheckboxClick(row)}
                        checked={selectedMeetings.includes(row)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.patient?.firstName} {row.patient?.lastName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.professional?.firstName} {row.professional?.lastName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(row.date).format(DATE_FORMAT)},<br />
                      {dayjs(row.startTime).format(TIME_FORMAT)} -{" "}
                      {dayjs(row.endTime).format(TIME_FORMAT)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link href={`/meetings/${row.id}`}>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing={2}>
                        <Box
                          onClick={() => {
                            setSelectedMeetings([row]);
                            setAcceptMeetingsDialogOpen(true);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <CheckIcon />
                        </Box>
                        <Box
                          onClick={() => {
                            setSelectedMeetings([row]);
                            setRejectMeetingsDialogOpen(true);
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
        <AcceptMeetingsDialog
          meetings={selectedMeetings}
          isOpen={acceptMeetingsDialogOpen}
          setIsOpen={setAcceptMeetingsDialogOpen}
          callback={() => handleAcceptMeetingsState(selectedMeetings)}
          isLoading={acceptMeetingsIsLoading}
        />
        <RejectMeetingsDialog
          meetings={selectedMeetings}
          isOpen={rejectMeetingsDialogOpen}
          setIsOpen={setRejectMeetingsDialogOpen}
          callback={() => handleRejectMeetingsState(selectedMeetings)}
          isLoading={rejectMeetingsIsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default MeetingTodoTable;
