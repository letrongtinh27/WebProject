import * as React from 'react';

import {
    CreateButton,
    ExportButton,
    TopToolbar,
    EditButton,
    ChipField,
    SearchInput,
    DateInput,
    SelectColumnsButton,
    DatagridConfigurable,
    useGetList,
    BooleanInput,
    BooleanField,
    SimpleList,
} from 'react-admin';

import {
    Datagrid,
    List,
    NumberField,
    ImageField,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";

import { useMediaQuery, Theme } from "@mui/material";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);


export const TheatreList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.title}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" label="ID"/>
                    <TextField source="location_id" label="location_id"/>
                    <TextField source="name" label="location_id"/>
                    <TextField source="address" label="location_id"/>
                    <EditButton/>
                </Datagrid>
            )}
        </List>
    );
};
export default TheatreList;