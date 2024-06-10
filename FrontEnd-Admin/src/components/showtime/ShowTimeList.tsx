import * as React from "react";

import {
  EditButton,
  DatagridConfigurable, DeleteButton, FilterLiveSearch, SearchInput,
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
        sort={{field: 'movie.title', order: 'DESC'}}
        perPage={10}
        filters={ [<FilterLiveSearch source = "q" alwaysOn /> ] }
    >
        <DatagridConfigurable  rowClick="show">
          <TextField source="id" label="ID" />
          <TextField source="movie.title" label="Title" />
          <TextField source="theatre.name" label="Theatre" />
          <TextField source="room" label="Room" />
          <EditButton />
        </DatagridConfigurable >
    </List>
  );
};
export default ShowTimeList;
