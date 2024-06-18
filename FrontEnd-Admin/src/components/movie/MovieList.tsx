import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    EditButton,
    SearchInput,
    DatagridConfigurable,
    List,
    TextField,
} from 'react-admin';
import ImportButton from "../../Layout/ImportButton";
import { Box, Theme, useMediaQuery } from "@mui/material";



export const MovieList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const ListActions = () => (
        <TopToolbar>
            <CreateButton />
            <ExportButton />
            <ImportButton isSmall={isSmall} />
        </TopToolbar>
    );

    return (
        <List
            sort={{ field: 'title', order: 'DESC' }}
            perPage={10}
            actions={<ListActions />}
            filters={[<SearchInput source="q" alwaysOn />]}
        >
            {isSmall ? (
                <DatagridConfigurable rowClick="show">
                    <TextField source="title" label="Title" />
                    <EditButton />
                </DatagridConfigurable>
            ) : (
                <DatagridConfigurable rowClick="show">
                    <TextField source="id" label="ID" />
                    <TextField source="title" label="Title" />
                    <TextField source="type" label="Type" />
                    <EditButton />
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default MovieList;