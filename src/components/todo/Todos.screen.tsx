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
} from "@/components/todo/todoSlice";
import { Store } from "@/redux";
import PrescriptionTodoTable from "@/components/todo/PrescriptionTodoTable";
import useListAllPrescriptionsV2 from "@/api/prescriptions/useListAllPrescriptionsV2";
import useListAllMeetingsV2 from "@/api/scheduling/useListAllMeetingsV2";
import MeetingTodoTable from "@/components/todo/MeetingTodoTable";

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
  const { request: fetchPrescriptions } = useListAllPrescriptionsV2();
  const { request: fetchMeetings } = useListAllMeetingsV2();

  useEffect(() => {
    fetchUsers();
    fetchPrescriptions({
      pageNumber: 1,
      pageSize: 999,
      isAccepted: false,
    });
    fetchMeetings({
      pageNumber: 1,
      pageSize: 999,
      state: "PENDING",
    });
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
    fetchPrescriptions({
      pageNumber: 1,
      pageSize: 999,
      isAccepted: false,
    }).finally(() => dispatch(setRefetchPrescriptions(false)));
  }, [refetchPrescriptions]);

  useEffect(() => {
    if (!refetchMeetings) {
      return;
    }
    fetchMeetings({
      pageNumber: 1,
      pageSize: 999,
      state: "PENDING",
    }).finally(() => dispatch(setRefetchMeetings(false)));
  }, [refetchMeetings]);

  useEffect(() => {
    dispatch(setUsers(users));
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
