import {
    Create,
    DateInput,
    Edit, PasswordInput,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre, User} from "../../types";


export const UserCreate = (props: any) => {
    return(
        <Create>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Thông tin tài khoản"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <TextInput source="user" label={"User"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="email" label={"Email"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <PasswordInput source="password" label={"Password"} fullWidth></PasswordInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="phone_number" label={"Phone_number"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="full_name" label={"Name"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="gender" label={"Gender"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <DateInput source="birthday" label={"Birthday"} fullWidth></DateInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="role" label={"Role"} fullWidth></TextInput>
                    </Grid>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    );
}
export default UserCreate;