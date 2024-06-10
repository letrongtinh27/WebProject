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
    SimpleList, FilterLiveSearch,
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


export const MovieList = () => {
    return (
        <List
            sort={{field: 'title', order: 'DESC'}}
            perPage={10}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            <DatagridConfigurable rowClick="show">
                <TextField source="id" label="ID"/>
                <TextField source="title" label="Title"/>
                <TextField source="type" label="Type"/>
                <EditButton/>
            </DatagridConfigurable>
        </List>
    );
};
export default MovieList;