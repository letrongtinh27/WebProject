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
        <List
            sort={{field: 'name', order: 'DESC'}}
            perPage={10}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.title}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Name"/>
                    <TextField source="address" label="Address"/>
                    <EditButton/>
                </Datagrid>
            )}
        </List>
    );
};
export default TheatreList;