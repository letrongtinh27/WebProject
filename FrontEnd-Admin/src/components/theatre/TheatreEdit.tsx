import {
    Edit,
    TabbedForm,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";


export const TheatreEdit = (props: any) => {
    const NameTheatre = () => {
        const record = useRecordContext<Theatre>();
        return record ? record.name : null;
    }

    return(
        <Edit title={<NameTheatre/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Thông tin rạp"
                    sx={{maxWidth: '40em'}}
                >
                   <Grid container columnSpacing={2}>
                       <TextInput source="name" label={"Tên rạp"} fullWidth></TextInput>
                   </Grid>

                    <Grid container columnSpacing={2}>
                        <TextInput source="address" label={"Địa chỉ"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="phone_number" label={"Số điện thoại"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="email" label={"Email"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="description" label={"Mô tả"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="room_summary" label={"Phòng"} fullWidth></TextInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="rooms" label={"Tổng số phòng"} fullWidth></TextInput>
                    </Grid>
                    <TheatreLocation/>
                    <TheatreOpeningHours/>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    );
}
export default TheatreEdit;