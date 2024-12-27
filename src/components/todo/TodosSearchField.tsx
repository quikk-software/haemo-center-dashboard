import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/dayjs";
import {
  setFilteredMeetings,
  setFilteredPrescriptions,
  setFilteredUsers,
} from "@/components/todo/todoSlice";

const TodosSearchField: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { users, prescriptions, meetings } = useSelector((s: Store) => s.todo);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value?.toLowerCase();
    setInputValue(event.target.value ?? "");
    if (!searchValue) {
      dispatch(setFilteredUsers(undefined));
      dispatch(setFilteredPrescriptions(undefined));
      dispatch(setFilteredMeetings(undefined));
      return;
    }
    const filteredUsers = users.filter(
      (user) =>
        `${user.firstName?.toLowerCase()} ${user.lastName?.toLowerCase()}`.includes(
          searchValue,
        ) || user.birthDay?.toLowerCase().includes(searchValue),
    );
    const filteredMeetings = meetings.filter(
      (meeting) =>
        `${meeting.patient?.firstName?.toLowerCase()} ${meeting.patient?.lastName?.toLowerCase()}`.includes(
          searchValue,
        ) ||
        `${meeting.professional?.firstName?.toLowerCase()} ${meeting.professional?.lastName?.toLowerCase()}`.includes(
          searchValue,
        ) ||
        dayjs(meeting.date).format(DATE_FORMAT).includes(searchValue),
    );
    const filteredPrescriptions = prescriptions.filter(
      (prescription) =>
        `${prescription.patient?.firstName?.toLowerCase()} ${prescription.patient?.lastName?.toLowerCase()}`.includes(
          searchValue,
        ) ||
        `${prescription.professional?.firstName?.toLowerCase()} ${prescription.professional?.lastName?.toLowerCase()}`.includes(
          searchValue,
        ) ||
        prescription.dosage?.toLowerCase().includes(searchValue) ||
        prescription.preparation?.toLowerCase().includes(searchValue),
    );

    dispatch(setFilteredUsers(filteredUsers));
    dispatch(setFilteredPrescriptions(filteredPrescriptions));
    dispatch(setFilteredMeetings(filteredMeetings));
  };

  const handleSearchClear = () => {
    dispatch(setFilteredUsers(undefined));
    dispatch(setFilteredPrescriptions(undefined));
    dispatch(setFilteredMeetings(undefined));
    setInputValue("");
  };

  return (
    <TextField
      placeholder="To Do's durchsuchen"
      label="To Do's durchsuchen"
      onChange={handleSearch}
      value={inputValue}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearchClear}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TodosSearchField;
