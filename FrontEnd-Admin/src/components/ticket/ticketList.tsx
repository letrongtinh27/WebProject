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

import {useMediaQuery, Theme, Box} from "@mui/material";

const ListActions = () => (
    <TopToolbar>
        <ExportButton />
    </TopToolbar>
);


export const TicketList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            perPage={10}
            actions={<ListActions />}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            {isSmall ? (
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID"/>
                    <TextField source="ticketCode" label="Code"/>
                </Datagrid>
                ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID"/>
                    <TextField source="showTime.movie.title" label="Movie"/>
                    <TextField source="showTime.theatre.name" label="Theatre"/>
                    <TextField source="price" label="Price"/>
                    <TextField source="seat.room" label="Room"/>
                    <TextField source="ticketCode" label="Code"/>
                </Datagrid>
            )}
        </List>
    );
};
export default TicketList;