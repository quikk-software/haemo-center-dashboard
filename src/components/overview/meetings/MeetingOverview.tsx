import React, { useEffect, useState } from "react";

import {
  Chip,
  Grid,
  IconButton,
  TablePagination,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Badge,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { DATE_FORMAT, TIME_FORMAT } from "@/dayjs/Dayjs";
import Link from "@/components/common/Link";
import { Edit, FilterAlt, DateRange } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { useListMeetings } from "@/api/scheduling/useListMeetings";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES, USER_ROLES } from "@/constants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { useListSchedulingUsers } from "@/api/scheduling/useListSchedulingUsers";

const ServerDay = (props: any) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format("YYYY-MM-DD"));

  if (isSelected) {
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        variant="dot"
        color="success"
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  return (
    <PickersDay
      {...other}
      key={props.day.toString()}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
    />
  );
};

const MeetingOverview: React.FunctionComponent = () => {
  const [selectedPageSize, setSelectedPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedProfessionals, setselectedProfessionals] = useState<string[]>(
    [],
  );
  const [highlightedDays, setHighlightedDays] = useState<Dayjs[]>([]);

  const { fetch, data, pageNumber, count } = useListMeetings({
    pageNumber: 1,
    pageSize: selectedPageSize,
  });
  const { fetch: fetchAll, data: allMeetings } = useListMeetings({
    pageNumber: 1,
    pageSize: 9999,
  });
  const { fetch: fetchProfessionals, data: professionals } =
    useListSchedulingUsers({});

  const meetingStatus = ["Offen", "Angefragt", "Bestätigt"];

  useEffect(() => {
    fetchProfessionals(USER_ROLES.professional, 1, 999);
  }, []);

  useEffect(() => {
    fetchAll(
      ["PENDING", "ACCEPTED"],
      undefined,
      undefined,
      undefined,
      dayjs().toDate(),
      dayjs().add(6, "month").toDate(),
      selectedProfessionals.map(Number),
    );
  }, [selectedProfessionals]);

  useEffect(() => {
    getData(
      getSelectedMeetingStatus(selectedStatus),
      "desc",
      1,
      selectedPageSize,
      startDate,
      endDate,
      selectedProfessionals,
    );
  }, [selectedPageSize]);

  useEffect(() => {
    const acceptedMeetingDates = allMeetings
      .filter((meeting) => meeting.state === "ACCEPTED")
      .map((meeting) => dayjs(meeting.date));
    setHighlightedDays(acceptedMeetingDates);
  }, [data]);

  const getStatus = (status?: string) => {
    switch (status) {
      case "CREATED":
        return <Chip label="Offen" />;
      case "PENDING":
        return <Chip label="Angefragt" color="secondary" />;
      case "ACCEPTED":
        return <Chip label="Bestätigt" color="success" />;
      default:
        return <Chip label="Offen" />;
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    getData(
      getSelectedMeetingStatus(selectedStatus),
      "desc",
      newPage + 1,
      selectedPageSize,
      startDate,
      endDate,
      selectedProfessionals,
    );
  };

  function getData(
    states: string[],
    order: any,
    pages: number,
    selectedPageSize: number,
    startOfDay: Dayjs | null,
    endOfDay: Dayjs | null,
    professionalIds: string[],
  ): void {
    let startDate1 = dayjs().toDate();
    let endDate1 = dayjs().add(6, "month").toDate();
    if (startOfDay) {
      startDate1 = startOfDay.toDate();
    }

    if (endOfDay) {
      endDate1 = endOfDay.toDate();
    }
    fetch(
      states,
      order,
      pages,
      selectedPageSize,
      startDate1,
      endDate1,
      professionalIds.map(Number),
    );
  }

  function getSelectedMeetingStatus(filters: string[]) {
    if (filters.length === 0) {
      return ["ACCEPTED", "PENDING"];
    }
    let activeFilters: string[] = [];
    filters.forEach((f) => {
      switch (f) {
        case "Bestätigt":
          activeFilters.push("ACCEPTED");
          break;
        case "Angefragt":
          activeFilters.push("PENDING");
          break;
        case "Ausstehend":
        default:
          activeFilters.push("CREATED");
          break;
      }
    });
    return activeFilters;
  }

  const handleStatusFilterChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedStatus(event.target.value as string[]);
    getData(
      getSelectedMeetingStatus(event.target.value as string[]),
      "desc",
      1,
      selectedPageSize,
      startDate,
      endDate,
      selectedProfessionals,
    );
  };

  const handleProfessionalFilterChange = (
    event: SelectChangeEvent<string[]>,
  ) => {
    setselectedProfessionals(event.target.value as string[]);
    getData(
      getSelectedMeetingStatus(selectedStatus),
      "desc",
      1,
      selectedPageSize,
      startDate,
      endDate,
      event.target.value as string[],
    );
  };

  const selectCurrentWeek = () => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
    getData(
      getSelectedMeetingStatus(selectedStatus),
      "desc",
      1,
      selectedPageSize,
      startOfWeek,
      endOfWeek,
      selectedProfessionals,
    );
  };

  const selectToday = () => {
    const today = dayjs();
    const endOfDay = today.endOf("day");
    const startOfDay = today.startOf("day");
    setStartDate(startOfDay);
    setEndDate(endOfDay);
    getData(
      getSelectedMeetingStatus(selectedStatus),
      "desc",
      1,
      selectedPageSize,
      startOfDay,
      endOfDay,
      selectedProfessionals,
    );
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setselectedProfessionals([]);
    setSelectedStatus([]);
    getData(
      ["ACCEPTED", "PENDING"],
      "desc",
      1,
      selectedPageSize,
      null,
      null,
      [],
    );
  };

  const minSelectableDate = dayjs();
  const maxSelectableDate = dayjs().add(6, "month");

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Typography variant="h4" component="h4">
          Übersicht Termine
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Link href={`/meetings/timeframes?id=${selectedProfessionals.at(0)}`}>
          <Button
            variant="contained"
            onClick={selectToday}
            fullWidth
            endIcon={<DateRange />}
            disabled={selectedProfessionals.length !== 1}
          >
            Zeitfenster verwalten
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="row" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="filter-label">Arzt auswählen</InputLabel>
            <Select
              labelId="filter-label"
              multiple
              value={selectedProfessionals}
              label="Arzt auswählen"
              onChange={handleProfessionalFilterChange}
              renderValue={(selected) => (
                <Box sx={{ flexGrow: 1 }}>
                  {selected.length > 0
                    ? professionals
                        .filter((p: any) => selected.includes(p.id))
                        .map((p: any) => `${p.firstName} ${p.lastName}`)
                        .join(", ")
                    : "Bitte auswählen"}
                </Box>
              )}
            >
              {professionals.map((professional: any) => (
                <MenuItem key={professional!.id} value={professional!.id}>
                  <Checkbox
                    checked={selectedProfessionals.includes(professional!.id)}
                  />
                  {professional!.firstName + " " + professional!.lastName}
                </MenuItem>
              ))}
            </Select>
            {selectedProfessionals.length > 0 && (
              <IconButton
                size="small"
                sx={{ position: "absolute", right: 20, top: 12 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setselectedProfessionals([]);
                  getData(
                    getSelectedMeetingStatus(selectedStatus),
                    "desc",
                    1,
                    selectedPageSize,
                    startDate,
                    endDate,
                    [],
                  );
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </FormControl>
          <Button
            variant="outlined"
            onClick={selectToday}
            fullWidth
            endIcon={<FilterAlt />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              color: "black",
              borderColor: "lightgray",
            }}
          >
            Termine Heute
          </Button>
          <Button
            variant="outlined"
            onClick={selectCurrentWeek}
            fullWidth
            endIcon={<FilterAlt />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              color: "black",
              borderColor: "lightgray",
            }}
          >
            Termine diese Woche
          </Button>
          <FormControl fullWidth>
            <InputLabel id="filter-label">Status</InputLabel>
            <Select
              labelId="filter-label"
              multiple
              value={selectedStatus}
              label="Terminstatus"
              onChange={handleStatusFilterChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {meetingStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={selectedStatus.includes(status)} />
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={handleResetFilter}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table aria-label="Termine">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Arzt</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Termindetails</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
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
                    <TableCell>
                      {row.timeFrameType ? (
                        <Chip label={row.timeFrameType} />
                      ) : null}
                    </TableCell>
                    <TableCell>{getStatus(row.state)}</TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <Link href={`/meetings/${row.id}`}>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          rowsPerPage={selectedPageSize}
          rowsPerPageOptions={PAGE_SIZES}
          onRowsPerPageChange={(event) =>
            setSelectedPageSize(
              event.target.value
                ? Number(event.target.value)
                : DEFAULT_PAGE_SIZE,
            )
          }
          labelRowsPerPage="Ergebnisse pro Seite"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} von ${count}`
          }
        />
      </Grid>
      <Grid item xs={4} spacing={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            minDate={minSelectableDate}
            maxDate={maxSelectableDate}
            value={startDate}
            onChange={(newValue: Dayjs | null) => {
              setStartDate(newValue);
              setEndDate(newValue);
              getData(
                getSelectedMeetingStatus(selectedStatus),
                "desc",
                1,
                selectedPageSize,
                newValue,
                newValue,
                selectedProfessionals,
              );
            }}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays: highlightedDays.map((day) =>
                  day.format("YYYY-MM-DD"),
                ),
              } as any,
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default MeetingOverview;
