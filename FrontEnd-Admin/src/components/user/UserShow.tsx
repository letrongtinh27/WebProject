import {
    DateField,
    DateInput,
    Edit, Show, SimpleShowLayout,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre, User} from "../../types";


export const UserShow = (props: any) => {
    const NameUser = () => {
        const record = useRecordContext<User>();
        return record ? record.user : null;
    }

    return(
        <Show title={<NameUser/>}>
            <SimpleShowLayout>
                    <TextField source="username" label={"User"} ></TextField>
                    <TextField source="email" label={"Email"} ></TextField>
                    <TextField source="phone_number" label={"Phone_number"} ></TextField>
                    <TextField source="full_name" label={"Name"} ></TextField>
                    <TextField source="gender" label={"Gender"} ></TextField>
                    <DateField source="birthday" label={"Birthday"} ></DateField>
                    <TextField source="role" label={"Role"} ></TextField>
            </SimpleShowLayout>
        </Show>
    );
}
export default UserShow;