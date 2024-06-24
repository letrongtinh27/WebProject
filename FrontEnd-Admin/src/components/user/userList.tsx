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
import Cookies from "js-cookie";
const role = Cookies.get("role");

const ListActions = ({ role }: { role: string | null }) => (
    <TopToolbar>
        {role !== 'manager' && <CreateButton />}
        <ExportButton />
    </TopToolbar>
);


export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        const userRole = Cookies.get("role");
        setRole(userRole || null);
    }, []);

    if (role === null) {
        return null;
    }
    return (
        <List
            sort={{field: 'username', order: 'DESC'}}
            perPage={10}
            actions={<ListActions  role={role}/>}
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