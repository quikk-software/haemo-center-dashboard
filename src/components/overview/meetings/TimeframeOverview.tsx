import React, { useEffect, useState } from "react";

import {
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
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
import { DateRange, Delete } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from "@/constants";
import { useListTimeframes } from "@/api/scheduling/useListTimeframes";
import { useDeleteTimeFrame } from "@/api/scheduling/useDeleteTimeFrame";
import { useSnackbarComponent } from "@/components/layout/Snackbar";

interface TimeframeOverviewProps {
  professionalId: number;
}

const TimeframeOverview: React.FunctionComponent<TimeframeOverviewProps> = ({
  professionalId,
}) => {
  const [selectedPageSize, setSelectedPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [reload, setReload] = useState(false);

  const { displaySuccess, displayError } = useSnackbarComponent();

  const { fetch, data, pageNumber, count } = useListTimeframes({
    pageNumber: 1,
    pageSize: selectedPageSize,
  });
  const { mutate: deleteTimeFrame } = useDeleteTimeFrame();

  useEffect(() => {
    fetch(professionalId, 1, selectedPageSize);
  }, [selectedPageSize, professionalId]);

  useEffect(() => {
    if (!reload) {
      return;
    }
    fetch(professionalId, 1, selectedPageSize).then(() => setReload(false));
  }, [selectedPageSize, professionalId, reload]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    fetch(professionalId, newPage + 1, selectedPageSize);
  };

  const handleDeleteTimeframe = (id?: number) => {
    if (!id) {
      return;
    }
    deleteTimeFrame(id)
      .then(() => {
        displaySuccess("Zeitfenster erfolgreich gelöscht!");
        setReload(true);
      })
      .catch(() => displayError("Zeitfenster konnte nicht gelöscht werden!"));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4" component="h4">
            Übersicht Zeitfenster
          </Typography>
          <Link href={`/meetings/timeframes/create?id=${professionalId}`}>
            <Button variant="contained" fullWidth endIcon={<DateRange />}>
              Zeitfenster anlegen
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Zeitfenster">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Zeitraum</TableCell>
                <TableCell>Termindauer</TableCell>
                <TableCell>Termindetails</TableCell>
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
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(row.startDate).format(DATE_FORMAT)} -{" "}
                      {dayjs(row.endDate).format(DATE_FORMAT)}
                    </TableCell>
                    <TableCell>{row.meetingDuration} Minuten</TableCell>
                    <TableCell>
                      {" "}
                      {row.type ? <Chip label={row.type} /> : null}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      sx={{
                        position: "sticky",
                        right: 0,
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        zIndex: 2,
                      }}
                    >
                      <IconButton onClick={() => handleDeleteTimeframe(row.id)}>
                        <Delete />
                      </IconButton>
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
    </Grid>
  );
};

export default TimeframeOverview;
