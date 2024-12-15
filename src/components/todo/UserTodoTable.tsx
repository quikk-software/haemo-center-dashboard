import React, { useState } from "react";
import {
  Alert,
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircle, Clear } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { DATE_FORMAT, dayjs } from "@/dayjs/Dayjs";
import CheckIcon from "@/components/todo/CheckIcon";
import LaunchIcon from "@mui/icons-material/Launch";
import { GetUserResponse } from "@/@types/user";
import ConfirmUserDialog from "@/components/todo/ConfirmUsersDialog";
import useActivateUser from "@/api/users/useActivateUser";
import { setRefetchUsers } from "@/components/todo/todoSlice";
import Link from "@/components/common/Link";

const UserTodoTable: React.FunctionComponent = () => {
  const [selectedUsers, setSelectedUsers] = useState<GetUserResponse[]>([]);
  const [activateUsersIsLoading, setActivateUsersIsLoading] = useState(false);
  const [activateUsersIsSuccess, setActivateUsersIsSuccess] = useState(false);
  const [activateUsersIsError, setActivateUsersIsError] = useState(false);
  const [confirmUsersDialogOpen, setConfirmUsersDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const { users } = useSelector((s: Store) => s.todo);

  const { request: activateUser } = useActivateUser();

  const handleCheckboxClick = (user: GetUserResponse) => {
    const updatedSelectedUsers = [...selectedUsers];
    const index = selectedUsers.findIndex((su) => su.id === user.id);
    if (index > -1) {
      if (selectedUsers.length === 1) {
        setSelectedUsers([]);
        return;
      }

      updatedSelectedUsers.splice(index, 1);

      setSelectedUsers(updatedSelectedUsers);
    } else {
      setSelectedUsers([...updatedSelectedUsers, user]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
  };

  const handleActivateUsers = (users: GetUserResponse[]) => {
    setActivateUsersIsSuccess(false);
    setActivateUsersIsError(false);

    setActivateUsersIsLoading(true);
    const promises: Promise<void>[] = [];
    users.forEach((user) => {
      if (!!user?.id) {
        promises.push(activateUser(user.id));
      }
    });

    Promise.all(promises)
      .then(() => setActivateUsersIsSuccess(true))
      .catch(() => setActivateUsersIsError(true))
      .finally(() => {
        setSelectedUsers([]);
        dispatch(setRefetchUsers(true));
        setConfirmUsersDialogOpen(false);
        setActivateUsersIsLoading(false);
      });
  };

  const disabled = selectedUsers.length === 0;

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
              <Link href="/users">
                <IconButton>
                  <LaunchIcon />
                </IconButton>
              </Link>
              Nutzer
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() => setConfirmUsersDialogOpen(true)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <CheckIcon disabled={disabled} />
                <Typography variant="subtitle2">
                  Auswahl verifizieren
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {activateUsersIsSuccess ? (
            <Alert
              icon={<CheckCircle fontSize="inherit" />}
              severity="success"
              action={
                <Clear
                  onClick={() => setActivateUsersIsSuccess(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Nutzer erfolgreich verifiziert.
            </Alert>
          ) : null}
          {activateUsersIsError ? (
            <Alert
              icon={<Clear fontSize="inherit" />}
              severity="error"
              action={
                <Clear
                  onClick={() => setActivateUsersIsError(false)}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              }
            >
              Bei der Verifzierung von Nutzern ist ein Fehler aufgetreten. Bitte
              überprüfen Sie Ihre Auswahl und versuchen Sie es erneut.
            </Alert>
          ) : null}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 400,
          }}
        >
          <Table aria-label="Nutzer To Do's">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-label": "Alle Nutzer auswählen",
                    }}
                    onClick={handleSelectAll}
                    checked={selectedUsers.length > 0}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Geburtsdatum</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        "aria-label": "Nutzer auswählen",
                      }}
                      onChange={() => handleCheckboxClick(row)}
                      checked={selectedUsers.includes(row)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {dayjs(row.birthDay).format(DATE_FORMAT)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Stack direction="row" spacing={2}>
                      <Box
                        onClick={() => {
                          setSelectedUsers([row]);
                          setConfirmUsersDialogOpen(true);
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CheckIcon />
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmUserDialog
          users={selectedUsers}
          isOpen={confirmUsersDialogOpen}
          setIsOpen={setConfirmUsersDialogOpen}
          callback={() => handleActivateUsers(selectedUsers)}
          isLoading={activateUsersIsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default UserTodoTable;
