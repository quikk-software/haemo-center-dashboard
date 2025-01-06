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
import { getDateFormat, getTimeFormat } from "@/dayjs";
import useUpdateMeetingState from "@/api/scheduling/useUpdateMeetingState";
import { useGetMeeting } from "@/api/scheduling/useGetMeeting";
import { useRouter } from "next/router";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const MeetingDetail: React.FunctionComponent = () => {
  const [isAcceptMeetingDialogOpen, setIsAcceptMeetingDialogOpen] =
    useState(false);
  const [isDeclineMeetingDialogOpen, setIsDeclineMeetingDialogOpen] =
    useState(false);

  const meetingId = useQuery("id");

  const router = useRouter();
  const { displaySuccess, displayError } = useSnackbarComponent();

  const {
    fetch,
    data: meeting,
    isLoading: getMeetingIsLoading,
  } = useGetMeeting();

  const { request, isLoading: updateMeetingIsLoading } =
    useUpdateMeetingState();

  useEffect(() => {
    fetch(Number(meetingId));
  }, [meetingId]);

  if (getMeetingIsLoading) {
    return <>Lädt...</>;
  }

  if (!meeting) {
    return (
      <>Der Termin mit der Nummer {meetingId} konnte nicht geladen werden.</>
    );
  }

  const handleMeetingStateClick = async (meetingId: number, state?: string) => {
    request(meetingId, state);

    router.back();
  };

  const isAcceptedState = meeting.state === "ACCEPTED";
  const isCreatedState = meeting.state === "CREATED";

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3">Termindetails</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Zeitraum</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Datum"
                  defaultValue={getDateFormat(meeting.date)}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Beginn"
                  defaultValue={getTimeFormat(meeting.startTime)}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Ende"
                  defaultValue={getTimeFormat(meeting.endTime)}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Teilnehmer</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isCreatedState || isAcceptedState}
                  onClick={() => setIsAcceptMeetingDialogOpen(true)}
                >
                  Akzeptieren
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  disabled={isCreatedState}
                  onClick={() => setIsDeclineMeetingDialogOpen(true)}
                >
                  Ablehnen
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <ConfirmDialog
        title="Termin akzeptieren"
        description="Du bist dabei folgenden Termin zu akzeptieren. Bitte bestätige diesen Vorgang."
        isOpen={isAcceptMeetingDialogOpen}
        setIsOpen={setIsAcceptMeetingDialogOpen}
        isLoading={updateMeetingIsLoading}
        callback={() =>
          handleMeetingStateClick(Number(meetingId), "ACCEPTED")
            .then(() => displaySuccess("Termin erfolgreich akzeptiert!"))
            .catch(() => {
              displayError("Termin konnte nicht akzeptiert werden!");
            })
        }
      />
      <ConfirmDialog
        title="Termin ablehnen"
        description="Du bist dabei folgenden Termin abzulehnen. Bitte bestätige diesen Vorgang."
        isOpen={isDeclineMeetingDialogOpen}
        setIsOpen={setIsDeclineMeetingDialogOpen}
        isLoading={updateMeetingIsLoading}
        callback={() =>
          handleMeetingStateClick(Number(meetingId))
            .then(() => displaySuccess("Termin erfolgreich abgelehnt!"))
            .catch(() => {
              displayError("Termin konnte nicht abgelehnt werden!");
            })
        }
      />
    </Grid>
  );
};

export default MeetingDetail;
