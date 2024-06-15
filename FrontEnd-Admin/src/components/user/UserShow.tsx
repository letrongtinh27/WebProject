import {
    DateField,
    DateInput, DeleteButton,
    Edit, Show, SimpleShowLayout,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';
import Cookies from "js-cookie";
import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre, User} from "../../types";
import {styled} from "@mui/material/styles";

const role = Cookies.get("role")
const StyledLabel = styled('span')({
    fontSize: '20px',
    fontWeight: 'bold',
});

export const UserShow = (props: any) => {
    return(
        <Show>
            <SimpleShowLayout>
                <TextField
                    source="username"
                    label={<StyledLabel>User</StyledLabel>}
                />
                <TextField
                    source="email"
                    label={<StyledLabel>Email</StyledLabel>}
                />
                <TextField
                    source="phone_number"
                    label={<StyledLabel>Phone Number</StyledLabel>}
                />
                <TextField
                    source="full_name"
                    label={<StyledLabel>Name</StyledLabel>}
                />
                <TextField
                    source="gender"
                    label={<StyledLabel>Gender</StyledLabel>}
                />
                <DateField
                    source="birthday"
                    label={<StyledLabel>Birthday</StyledLabel>}
                />
                <TextField
                    source="role"
                    label={<StyledLabel>Role</StyledLabel>}
                />
                { role === 'admin' ?
                    <DeleteButton/> : <>
                    </>
                }

            </SimpleShowLayout>
        </Show>
    );
}
export default UserShow;