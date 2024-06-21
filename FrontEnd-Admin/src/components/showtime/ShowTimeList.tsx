import * as React from "react";

import {
  EditButton,
  DatagridConfigurable, DeleteButton, FilterLiveSearch, SearchInput, TopToolbar, CreateButton, ExportButton,
} from "react-admin";

import {
  List,
  TextField,
} from "react-admin";

import {useMediaQuery, Theme, Box} from "@mui/material";
import ImportButton from "../../Layout/ImportButton";

const ListActions = () => (
    <TopToolbar>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
);
export const ShowTimeList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List
        sort={{field: 'movie.title', order: 'DESC'}}
        perPage={10}
        actions={<ListActions />}
        filters={ [<FilterLiveSearch source = "q" alwaysOn /> ] }
    >
      {isSmall ? (
          <DatagridConfigurable  rowClick="show">
            <TextField source="movie.title" label="Title" />
            <EditButton />
          </DatagridConfigurable >
      ) : (
          <DatagridConfigurable  rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="movie.title" label="Title" />
            <TextField source="theatre.name" label="Theatre" />
            <TextField source="room" label="Room" />
            <EditButton />
          </DatagridConfigurable >
      )}
    </List>
  );
};
export default ShowTimeList;
