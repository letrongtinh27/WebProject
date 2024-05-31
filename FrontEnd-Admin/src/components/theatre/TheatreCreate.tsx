import {
    Create,
    Edit, NumberInput, SelectInput,
    TabbedForm,
    TextInput, TimeInput, useGetList,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Location, Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";


export const TheatreCreate = (props: any) => {
    const [location, setLocations] = useState<Location[]>([]);
    const {data}: any = useGetList<Location>('locations',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setLocations(data);
        }
    }, [data]);

    return(
        <Create>
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
                        <NumberInput source="room_summary" label={"Phòng"} fullWidth></NumberInput>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <NumberInput source="rooms" label={"Tổng số phòng"} fullWidth></NumberInput>
                    </Grid>
                    <Grid  container columnSpacing={2}>
                        <SelectInput source="locations_id"
                                     label="Khu vực"
                                     choices={location} fullWidth
                                     optionText="address"
                                     optionValue="id"
                        />
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TimeInput source="Opening_hours" label={"Thời gian mở cửa"} fullWidth></TimeInput>
                    </Grid>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    );
}
export default TheatreCreate;