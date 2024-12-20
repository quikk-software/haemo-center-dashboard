import React, { useEffect } from "react";

import {
  Chip,
  Grid,
  IconButton,
  TablePagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { DATE_FORMAT, dayjs, TIME_FORMAT } from "@/dayjs/Dayjs";
import Link from "@/components/common/Link";
import { Edit } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { useListMeetings } from "@/api/scheduling/useListMeetings";

const PAGE_SIZE = 5;

const MeetingOverview: React.FunctionComponent = () => {
  const { fetch, data, pageNumber, count } = useListMeetings({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    fetch(undefined, 1, PAGE_SIZE);
  }, []);

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
    fetch(undefined, newPage + 1, PAGE_SIZE);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Übersicht Termine
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Termine To Do's">
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
                    <TableCell component="th" scope="row">
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
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} von ${count}`
          }
        />
      </Grid>
    </Grid>
  );
};

export default MeetingOverview;
