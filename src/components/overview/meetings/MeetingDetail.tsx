import React, { useEffect } from "react";
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

const MeetingDetail: React.FunctionComponent = () => {
  const meetingId = useQuery("id");

  const router = useRouter();
  const { fetch, data: meeting, isLoading } = useGetMeeting();

  const { request } = useUpdateMeetingState();

  useEffect(() => {
    fetch(Number(meetingId));
  }, [meetingId]);

  if (!meeting && isLoading) {
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
                  color="secondary"
                  disabled={isCreatedState}
                  onClick={() => {
                    handleMeetingStateClick(Number(meetingId));
                  }}
                >
                  Ablehnen
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isCreatedState || isAcceptedState}
                  onClick={() => {
                    handleMeetingStateClick(Number(meetingId), "ACCEPTED");
                  }}
                >
                  Akzeptieren
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MeetingDetail;
