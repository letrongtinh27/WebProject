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
    SimpleList, email, DeleteButton,
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
        <DeleteButton/>
    </TopToolbar>
);


export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            sort={{field: 'username', order: 'DESC'}}
            perPage={10}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }

        >
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID"/>
                    <TextField source="username" label="UserName"/>
                    <TextField source="email" label="Email"/>
                </Datagrid>
        </List>
    );
};
export default UserList;