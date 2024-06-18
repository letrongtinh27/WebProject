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
} from "react-admin";

import { Box,useMediaQuery, Theme } from "@mui/material";

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);
export const TheatreList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            sort={{field: 'name', order: 'DESC'}}
            perPage={10}
            actions={<ListActions />}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            {isSmall ? (
                <Datagrid rowClick="show">
                    <TextField source="name" label="Name"/>
                    <EditButton/>
                </Datagrid>
            ) : ( <Datagrid rowClick="show">
                <TextField source="id" label="ID"/>
                <TextField source="name" label="Name"/>
                <TextField source="address" label="Address"/>
                <EditButton/>
            </Datagrid>)}
        </List>
    );
};
export default TheatreList;