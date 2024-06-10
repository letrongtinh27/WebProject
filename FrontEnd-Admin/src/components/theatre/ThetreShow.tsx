import {
    Edit, NumberInput, Show, SimpleShowLayout,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";


export const TheatreShow = (props: any) => {
    const NameTheatre = () => {
        const record = useRecordContext<Theatre>();
        return record ? record.name : null;
    }

    return(
        <Show title={<NameTheatre/>}>
           <SimpleShowLayout>
               <TextField source="name" label={"Tên rạp"} ></TextField>
               <TextField source="address" label={"Địa chỉ"} ></TextField>
               <TextField source="phone_number" label={"Số điện thoại"} ></TextField>
               <TextField source="email" label={"Email"} ></TextField>
               <TextField source="description" label={"Mô tả"} ></TextField>
               <TextField source="room_summary" label={"Phòng"} ></TextField>
               <TextField source="rooms" label={"Tổng số phòng"} ></TextField>
               <TextField source="location.name" label={"Địa chỉ"} ></TextField>
               <TextField source="opening_hours" label={"Mở cửa"} ></TextField>
           </SimpleShowLayout>
        </Show>
    );
}
export default TheatreShow;