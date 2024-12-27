import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import UserTodoTable from "@/components/todo/UserTodoTable";
import useGetUsers from "@/api/users/useGetUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  setRefetchUsers,
  setRefetchPrescriptions,
  setRefetchMeetings,
  setMeetings,
  setPrescriptions,
} from "@/components/todo/todoSlice";
import { Store } from "@/redux";
import PrescriptionTodoTable from "@/components/todo/PrescriptionTodoTable";
import MeetingTodoTable from "@/components/todo/MeetingTodoTable";
import { useListMeetings } from "@/api/scheduling/useListMeetings";
import { useListPrescriptions } from "@/api/prescriptions/useListPrescriptions";

const TodosScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { refetchUsers, refetchPrescriptions, refetchMeetings } = useSelector(
    (s: Store) => s.todo,
  );

  const { request: fetchUsers, response: users } = useGetUsers({
    pageNumber: 0,
    pageSize: 999,
    query: "enabled:false",
  });
  const { fetch: fetchPrescriptions } = useListPrescriptions({
    pageNumber: 1,
    pageSize: 999,
  });
  const { fetch: fetchMeetings } = useListMeetings({
    pageNumber: 1,
    pageSize: 999,
  });

  useEffect(() => {
    fetchUsers();
    fetchPrescriptions(false, "desc", 1, 999).then(({ prescriptions, count }) =>
      dispatch(setPrescriptions({ prescriptions, count })),
    );
    fetchMeetings(["PENDING"], "desc", 1, 999).then(({ meetings, count }) =>
      dispatch(setMeetings({ meetings, count })),
    );
  }, []);

  useEffect(() => {
    if (!refetchUsers) {
      return;
    }
    fetchUsers().finally(() => dispatch(setRefetchUsers(false)));
  }, [refetchUsers]);

  useEffect(() => {
    if (!refetchPrescriptions) {
      return;
    }
    fetchPrescriptions(false, "desc", 1, 999)
      .then((prescriptions) => dispatch(setPrescriptions(prescriptions)))
      .finally(() => dispatch(setRefetchPrescriptions(false)));
  }, [refetchPrescriptions]);

  useEffect(() => {
    if (!refetchMeetings) {
      return;
    }
    fetchMeetings(["PENDING"], "desc", 1, 999)
      .then((meetings) => dispatch(setMeetings(meetings)))
      .finally(() => dispatch(setRefetchMeetings(false)));
  }, [refetchMeetings]);

  useEffect(() => {
    dispatch(setUsers({ users, count: users.length }));
  }, [users]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <UserTodoTable />
          </Grid>
          <Grid item xs={6}>
            <PrescriptionTodoTable />
          </Grid>
          <Grid item xs={12}>
            <MeetingTodoTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TodosScreen;
