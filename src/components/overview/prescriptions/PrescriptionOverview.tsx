import React, { useEffect, useState } from "react";

import {
  Chip,
  Grid,
  IconButton,
  TablePagination,
  Tooltip,
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
import { useListPrescriptions } from "@/api/prescriptions/useListPrescriptions";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from "@/constants";

const PrescriptionOverview: React.FunctionComponent = () => {
  const [selectedPageSize, setSelectedPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { fetch, data, pageNumber, count } = useListPrescriptions({
    pageNumber: 1,
    pageSize: selectedPageSize,
  });

  useEffect(() => {
    fetch(undefined, "desc", 1, selectedPageSize);
  }, [selectedPageSize]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    fetch(undefined, "desc", newPage + 1, selectedPageSize);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          Übersicht Rezepte
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Rezepte">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Angefordert am</TableCell>
                <TableCell>Freigegeben</TableCell>
                <TableCell>Präparat</TableCell>
                <TableCell>Dosis</TableCell>
                <TableCell>Notiz</TableCell>
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
                      {dayjs(row.createdAt).format(DATE_FORMAT)}
                      ,<br />
                      {dayjs(row.createdAt).format(TIME_FORMAT)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.isAccepted ? "Ja" : "Nein"}
                        color={row.isAccepted ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>{row.preparation}</TableCell>
                    <TableCell>{row.dosage}</TableCell>
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
                      <Link href={`/prescriptions/${row.id}`}>
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
    </Grid>
  );
};

export default PrescriptionOverview;
