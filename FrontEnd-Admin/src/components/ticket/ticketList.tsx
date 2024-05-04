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


export const TicketList = () => {
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
                    <TextField source="showTime.movie_st.title" label="Movie"/>
                    <TextField source="showTime.theatre_name.name" label="Theatre"/>
                    <TextField source="seat.row_char" label="Row"/>
                    <TextField source="seat.seat_number" label="Number"/>
                    <EditButton/>
                </Datagrid>
            )}
        </List>
    );
};
export default TicketList;