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

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);


export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List
            sort={{field: 'username', order: 'DESC'}}
            perPage={10}
            actions={<ListActions />}
            filters={ [<SearchInput source = "q" alwaysOn /> ] }
        >
            {isSmall ? (
                <Datagrid rowClick="show">
                    <TextField source="username" label="UserName"/>
                </Datagrid>
            ) : (  <Datagrid rowClick="show">
                <TextField source="id" label="ID"/>
                <TextField source="username" label="UserName"/>
                <TextField source="email" label="Email"/>
            </Datagrid>)}

        </List>
    );
};
export default UserList;