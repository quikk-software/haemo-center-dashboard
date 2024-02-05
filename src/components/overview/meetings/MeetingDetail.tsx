import React, { useEffect } from "react";
import useQuery from "@/utils/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { setMeeting } from "@/components/overview/meetings/meetingSlice";
import logger from "@/core/logger";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "@/theme";
import { produce } from "immer";
import {
  MEETING_STATES,
  meetingTranslations,
} from "@/components/overview/meetings/meeting.types";
import { getDateFormat, getTimeFormat } from "@/dayjs";
import useUpdateMeetingState from "@/api/scheduling/useUpdateMeetingState";
import {
  useResolveSchedulingProfessionalName,
  useResolveSchedulingPatientName,
} from "@/api/scheduling/useResolveSchedulingUserName";

const MeetingDetail: React.FC = () => {
  const id = useQuery("id");
  const dispatch = useDispatch();

  const { request: patientNameRequest } =
    useResolveSchedulingProfessionalName();
  const { request: professionalNameRequest } =
    useResolveSchedulingPatientName();

  const {
    schedulingProfessionalName,
    schedulingPatientName,
    meetings,
    meeting,
    allMeetings,
  } = useSelector((store: Store) => store.meetings);

  useEffect(() => {
    if (meeting) {
      patientNameRequest(String(meeting.patientUserId));
      professionalNameRequest(String(meeting.doctorUserId));
    }
  }, [meeting]);

  const { request } = useUpdateMeetingState();

  const updateMeetingState = (newMeetingState: string) => {
    if (!meeting) {
      logger.debug("Meeting does not exist. Cannot update meeting details.");
      return;
    }

    // @ts-ignore
    if (!MEETING_STATES.includes(newMeetingState)) {
      logger.debug(`Unknown meeting state: ${newMeetingState}`);
      return;
    }

    const nextMeeting = produce(meeting, (draft) => {
      draft.state = newMeetingState;
    });
    dispatch(setMeeting(nextMeeting));
  };

  useEffect(() => {
    // Meeting Id is always a number

    const meetingCandidate = [...meetings, ...allMeetings].find(
      (m) => m.id === Number(id),
    );
    if (id !== undefined && meetingCandidate !== undefined) {
      dispatch(setMeeting(meetingCandidate));
    } else {
      logger.error("No meetings stored. Please access meetings first.");
    }
  }, []);

  if (!meeting) {
    return <>Der Termin mit der Nummer {id} konnte nicht geladen werden.</>;
  }

  const { date, startTime, endTime, doctorUserId, patientUserId, state } =
    meeting;

  const isPendingState = state === "PENDING";

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color={theme.palette.text.primary}>
          Termindetails
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Zeitraum
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Datum"
          defaultValue={getDateFormat(date)}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Beginn"
          defaultValue={getTimeFormat(startTime)}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Ende"
          defaultValue={getTimeFormat(endTime)}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Teilnehmer
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {schedulingProfessionalName !== null && (
          <TextField
            label="Arzt"
            value={schedulingProfessionalName}
            fullWidth
            disabled
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {schedulingPatientName !== null && (
          <TextField
            label="Patient"
            value={schedulingPatientName}
            fullWidth
            disabled
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Status
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select
            value={state}
            label="Status"
            onChange={(e) => updateMeetingState(e.target.value)}
          >
            {MEETING_STATES.map((m) => (
              <MenuItem value={m} key={m}>
                {meetingTranslations[m]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={isPendingState}
          onClick={() => {
            if (!state) {
              return;
            }

            // @ts-ignore
            request(Number(id), state);
          }}
        >
          Speichern
        </Button>
      </Grid>
      {isPendingState && (
        <Grid item xs={12}>
          <Alert severity="warning">
            <AlertTitle>Speichern deaktiviert</AlertTitle>
            Der Termin kann nicht gespeichert werden, da er den Status{" "}
            {meetingTranslations["PENDING"]} enthält.
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default MeetingDetail;
