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
import Cookies from "js-cookie";

export const MovieList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const role = Cookies.get("role");

    const ListActions = () => (
        <TopToolbar>
            {role !== 'manager' && <CreateButton />}
            <ExportButton />
            {role !== 'manager' && <ImportButton isSmall={isSmall} />}
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
                    {role !== 'manager' && <EditButton />}
                </DatagridConfigurable>
            ) : (
                <DatagridConfigurable rowClick="show">
                    <TextField source="id" label="ID" />
                    <TextField source="title" label="Title" />
                    <TextField source="type" label="Type" />
                    {role !== 'manager' && <EditButton />}
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default MovieList;