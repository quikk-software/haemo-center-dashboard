import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useCreateTimeFrame } from "@/api/scheduling/useCreateTimeFrame";
import {
  BACKEND_DATE_FORMAT,
  DATE_FORMAT,
  SCHEDULING_DATE_FORMAT,
  TIME_FORMAT,
} from "@/dayjs";
import useQuery from "@/utils/useQuery";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
import { useRouter } from "next/router";
import { dayjs } from "@/dayjs/Dayjs";
import { Dayjs } from "dayjs";

const weekdayMap: { [key: string]: number } = {
  montag: 1,
  dienstag: 2,
  mittwoch: 3,
  donnerstag: 4,
  freitag: 5,
  samstag: 6,
  sonntag: 0,
};

const TimeframeDetails: React.FunctionComponent = () => {
  const {
    mutate: createTimeFrame,
    isLoading,
    isError,
    errorDetail,
    setIsError,
  } = useCreateTimeFrame();

  const professionalId = useQuery("id");
  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [meetingDuration, setMeetingDuration] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [timeFrameType, setTimeFrameType] = useState<string>("");

  const { displaySuccess, displayError } = useSnackbarComponent();

  useEffect(() => {
    if (!isError) {
      return;
    }
    displayError(
      `Anlegen des Zeitfensters fehlgeschlagen${errorDetail ? `: ${errorDetail}` : ""}`,
    );
    setIsError(false);
  }, [isError, errorDetail]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = () => {
    if (
      !name ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !meetingDuration ||
      selectedDays.length === 0 ||
      !professionalId
    ) {
      alert("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    const formattedStartTime = startTime.format(SCHEDULING_DATE_FORMAT);
    const formattedEndTime = endTime.format(SCHEDULING_DATE_FORMAT);

    const formattedStartDate = startDate
      .startOf("day")
      .add(1, "day")
      .format(BACKEND_DATE_FORMAT);
    const formattedEndDate = endDate
      .startOf("day")
      .add(1, "day")
      .format(BACKEND_DATE_FORMAT);

    const payload = {
      name,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      meetingDuration: parseInt(meetingDuration, 10),
      daysOfWeek: selectedDays.map((day) => weekdayMap[day]),
      type: timeFrameType || undefined,
      professionalId: Number(professionalId),
    };

    createTimeFrame(payload).then(() => {
      setName("");
      setMeetingDuration("");
      setTimeFrameType("");
      setSelectedDays([]);
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);

      displaySuccess("Zeitfenster erfolgreich angelegt");
    });
  };

  const minSelectableDate = dayjs().add(1, "day");
  const maxSelectableDate = dayjs().add(6, "month");

  const isInvalid =
    !name ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !meetingDuration ||
    selectedDays.length === 0 ||
    !professionalId;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Card>
        <CardHeader title="Zeitraum" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name des Zeitfensters"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Termindetails (optional)"
                fullWidth
                value={timeFrameType}
                onChange={(e) => setTimeFrameType(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormControl component="fieldset">
                  <FormGroup row>
                    {Object.keys(weekdayMap).map((day) => (
                      <FormControlLabel
                        key={day}
                        value={day}
                        control={
                          <Checkbox
                            checked={selectedDays.includes(day)}
                            onChange={() => toggleDay(day)}
                            color="secondary"
                          />
                        }
                        label={day.slice(0, 2).toUpperCase()}
                        labelPlacement="top"
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                label="Startdatum"
                value={startDate}
                onChange={(val) => setStartDate(val)}
                sx={{ width: "100%" }}
                minDate={minSelectableDate}
                maxDate={maxSelectableDate}
                format={DATE_FORMAT}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Enddatum"
                value={endDate}
                onChange={(val) => setEndDate(val)}
                sx={{ width: "100%" }}
                minDate={minSelectableDate}
                maxDate={maxSelectableDate}
                format={DATE_FORMAT}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Startzeit"
                value={startTime}
                onChange={(val) => setStartTime(val)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Endzeit"
                value={endTime}
                onChange={(val) => setEndTime(val)}
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Termindauer (Min)"
                fullWidth
                type="number"
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading || isInvalid}
              >
                {isLoading ? "Speichert..." : "Veröffentlichen"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => router.back()}
              >
                Zurück
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default TimeframeDetails;
