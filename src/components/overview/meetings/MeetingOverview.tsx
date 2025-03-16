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
  Checkbox
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { DATE_FORMAT, TIME_FORMAT } from "@/dayjs/Dayjs";
import Link from "@/components/common/Link";
import { Edit, Filter, FilterAlt } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { useListMeetings } from "@/api/scheduling/useListMeetings";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from "@/constants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from '@mui/material/Select';


const MeetingOverview: React.FunctionComponent = () => {
  const [selectedPageSize, setSelectedPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { fetch, data, pageNumber, count } = useListMeetings({
    pageNumber: 1,
    pageSize: selectedPageSize,
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const meetingStatus = ["Ausstehend", "Angefragt", "Bestätigt"];

  useEffect(() => {
    getData(getSelectedMeetingStatus(selectedFilters), "desc", 1, selectedPageSize, startDate, endDate);
  }, [selectedPageSize]);

  const getStatus = (status?: string) => {
    switch (status) {
      case "CREATED":
        return <Chip label="Ausstehend" />;
      case "PENDING":
        return <Chip label="Angefragt" color="secondary" />;
      case "ACCEPTED":
        return <Chip label="Bestätigt" color="success" />;
      default:
        return <Chip label="Ausstehend" />;
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    getData(getSelectedMeetingStatus(selectedFilters), "desc", newPage + 1, selectedPageSize, startDate, endDate);
  };

  function getData(states: string[], order: any, pages: number, selectedPageSize: number, startOfDay: Dayjs | null, endOfDay: Dayjs | null) : void {
    let startDate1 = undefined;
    let endDate1 = undefined;
    if(startOfDay) {
      startDate1 = startOfDay.toDate();
    }
    if(endOfDay)  {
      endDate1 = endOfDay.toDate();
    }
    fetch(states, order, pages, selectedPageSize, startDate1, endDate1);
  }

  function getSelectedMeetingStatus(filters : string[]) {
    if(filters.length === 0) {
      return ["ACCEPTED", "PENDING", "CREATED"];
    }
    let activeFilters : string[] = [];
    filters.forEach(f => {
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
    })
    return activeFilters;
  }

  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedFilters(event.target.value as string[]);
    getData(getSelectedMeetingStatus(event.target.value as string[]), "desc", 1, selectedPageSize, startDate, endDate);
  };

  const selectCurrentWeek = () => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
    getData(getSelectedMeetingStatus(selectedFilters), "desc", 1, selectedPageSize, startOfWeek, endOfWeek);
  };

  const selectToday = () => {
    const today = dayjs();
    const endOfDay = today.endOf('day');
    const startOfDay = today.startOf('day');
    setStartDate(startOfDay);
    setEndDate(endOfDay);
    getData(getSelectedMeetingStatus(selectedFilters), "desc", 1, selectedPageSize, startOfDay, endOfDay);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Typography variant="h4" component="h4">
          Übersicht Termine
        </Typography>
      </Grid>
      <Grid item xs={9}>
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
                      <Chip label={row.timeFrameType} />
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
      <Grid item xs={3}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button variant="outlined" onClick={selectToday} fullWidth endIcon={<FilterAlt/>} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px', textTransform: 'none', color: 'black', borderColor: 'lightgray' }}>Termine Heute</Button>
          <Button variant="outlined" onClick={selectCurrentWeek} fullWidth endIcon={<FilterAlt/>} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px', textTransform: 'none', color: 'black', borderColor: 'lightgray' }}>Termine diese Woche</Button>
          <FormControl fullWidth>
            <InputLabel id="filter-label">Status</InputLabel>
            <Select
              labelId="filter-label"
              multiple
              value={selectedFilters}
              label="Terminstatus"
              onChange={handleFilterChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {meetingStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={selectedFilters.includes(status)} />
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Von"
              value={startDate}
              onChange={(newValue: Dayjs | null) => { setStartDate(newValue), getData(getSelectedMeetingStatus(selectedFilters), "desc", 1, selectedPageSize, newValue, endDate)}}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="Bis"
              value={endDate}
              onChange={(newValue: Dayjs | null) => { setEndDate(newValue), getData(getSelectedMeetingStatus(selectedFilters), "desc", 1, selectedPageSize, startDate, newValue)}}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>

        </Box>
      </Grid>
    </Grid>
  );
};

export default MeetingOverview;
