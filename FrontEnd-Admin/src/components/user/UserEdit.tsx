import {
    DateInput,
    Edit, SelectInput,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre, User} from "../../types";


export const UserEdit = (props: any) => {
    const gender = [
        {id: 1, name: 'Nam'},
        {id: 2, name: 'Nữ'}
    ]
    const NameUser = () => {
        const record = useRecordContext<User>();
        return record ? record.user : null;
    }

    return(
        <Edit title={<NameUser/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Thông tin tài khoản"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container >
                        <TextInput source="username" label={"User"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="email" label={"Email"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="phone_number" label={"Phone_number"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="full_name" label={"Name"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="gender" label={"Gender"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <DateInput source="birthday" label={"Birthday"} fullWidth></DateInput>
                    </Grid>
                    <Grid container >
                        <SelectInput source="role" choices={gender} fullWidth  {...props}
                        />
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
}
export default UserEdit;