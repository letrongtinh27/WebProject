import * as React from "react";

import {
  EditButton,
  DatagridConfigurable, DeleteButton, FilterLiveSearch,
} from "react-admin";

import {
  List,
  TextField,
} from "react-admin";

import { useMediaQuery, Theme } from "@mui/material";


export const ShowTimeList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List
    >
        <DatagridConfigurable  rowClick="edit">
          <TextField source="id" label="ID" />
          <TextField source="movie.title" label="Title" />
          <TextField source="theatre.name" label="Theatre" />
          <TextField source="room" label="Room" />
          <TextField source="start_time" label="Thời gian bắt đầu" />
          <EditButton />
        </DatagridConfigurable >
    </List>
  );
};
export default ShowTimeList;
