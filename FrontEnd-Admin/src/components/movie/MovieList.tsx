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

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);


export const MovieList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            sort={{field: 'title', order: 'DESC'}}
            perPage={10}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            {/*<FilterLiveSearch label={"Tìm..."} name={"search"}/>*/}
        {isSmall ? (
                    <SimpleList
                        primaryText={(record) => record.id}
                        secondaryText={(record) => record.title}
                    />
                ) : (
            <DatagridConfigurable rowClick="edit">
                <TextField source="id" label="ID"/>
                <TextField source="title" label="Title"/>
                <TextField source="type" label="Type"/>
                <EditButton/>
            </DatagridConfigurable>
        )}
        </List>
    );
};
export default MovieList;