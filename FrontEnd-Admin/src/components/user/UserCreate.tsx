import {
    CheckboxGroupInput,
    Create,
    DateInput,
    Edit, PasswordInput, SelectInput,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre, User} from "../../types";


export const UserCreate = (props: any) => {
    const gender = [
        {id: 1, name: 'Nam'},
        {id: 2, name: 'Nữ'}
    ]
    const role = [
        {id: 1, name: 'admin'},
        {id: 2, name: 'user'}
    ]

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
                        <SelectInput source="gender" choices={gender} fullWidth/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <DateInput source="birthday" label={"Birthday"} fullWidth></DateInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        {/*<TextInput source="role" label={"Role"} fullWidth></TextInput>*/}
                        <SelectInput source="role" choices={role} fullWidth/>
                    </Grid>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    );
}
export default UserCreate;