import * as React from "react";
import {
    EditButton,
    DatagridConfigurable, DeleteButton, FilterLiveSearch, SearchInput, TopToolbar, CreateButton, ExportButton,
} from "react-admin";
import {
    List,
    TextField,
} from "react-admin";
import { useMediaQuery, Theme, Box } from "@mui/material";
import ImportButton from "../../Layout/ImportButton";
import Cookies from "js-cookie";

const ListActions = ({ role }: { role: string | null }) => (
    <TopToolbar>
        {role !== 'manager' && <CreateButton />}
        <ExportButton />
    </TopToolbar>
);

export const ShowTimeList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        const userRole = Cookies.get("role");
        setRole(userRole || null);
    }, []);

    if (role === null) {
        return null; // hoặc hiển thị một loading spinner
    }

    return (
        <List
            sort={{ field: 'movie.title', order: 'DESC' }}
            perPage={10}
            actions={<ListActions role={role} />}
            filters={[<FilterLiveSearch source="q" alwaysOn />]}
        >
            {isSmall ? (
                <DatagridConfigurable rowClick="show">
                    <TextField source="movie.title" label="Title" />
                    {role !== 'manager' && <EditButton />}
                </DatagridConfigurable>
            ) : (
                <DatagridConfigurable rowClick="show">
                    <TextField source="id" label="ID" />
                    <TextField source="movie.title" label="Title" />
                    <TextField source="theatre.name" label="Theatre" />
                    <TextField source="room" label="Room" />
                    {role !== 'manager' && <EditButton />}
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default ShowTimeList;