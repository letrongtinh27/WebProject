import * as React from "react";
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
} from "react-admin";
import {
    Datagrid,
    List,
    NumberField,
    ImageField,
    TextField,
} from "react-admin";
import { Box, useMediaQuery, Theme } from "@mui/material";
import Cookies from "js-cookie";

const ListActions = ({ role }: { role: string | null }) => (
    <TopToolbar>
        {role !== 'manager' && <CreateButton />}
        <ExportButton />
    </TopToolbar>
);

export const TheatreList = () => {
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
            sort={{ field: 'name', order: 'DESC' }}
            perPage={10}
            actions={<ListActions role={role} />}
            filters={[<SearchInput source="q" alwaysOn />]}
        >
            {isSmall ? (
                <Datagrid rowClick="show">
                    <TextField source="name" label="Name" />
                    {role !== 'manager' && <EditButton />}
                </Datagrid>
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID" />
                    <TextField source="name" label="Name" />
                    <TextField source="address" label="Address" />
                    {role !== 'manager' && <EditButton />}
                </Datagrid>
            )}
        </List>
    );
};

export default TheatreList;