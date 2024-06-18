import {
    Edit, ImageField, NumberInput, Show, SimpleShowLayout,
    TabbedForm, TextField,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid, Theme, useMediaQuery} from "@mui/material";
import {Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";
import {styled} from "@mui/material/styles";


export const TheatreShow = (props: any) => {
    const StyledLabel = styled('span')({
        fontSize: '20px',
        fontWeight: 'bold',
    });

    const NameTheatre = () => {
        const record = useRecordContext<Theatre>();
        return record ? record.name : null;
    }

    return(
        <Show title={<NameTheatre/>}>
           <SimpleShowLayout>
               <TextField source="name" label={<StyledLabel>Tên rạp</StyledLabel>} ></TextField>
               <ImageField source="image" label={<StyledLabel>Image</StyledLabel>}></ImageField>
               <TextField source="address" label={<StyledLabel>Địa chỉ</StyledLabel>} ></TextField>
               <TextField source="phone_number" label={<StyledLabel>Số điện thoại</StyledLabel>} ></TextField>
               <TextField source="email" label={<StyledLabel>Email</StyledLabel>} ></TextField>
               <TextField source="description" label={<StyledLabel>Mô tả</StyledLabel>} ></TextField>
               <TextField source="room_summary" label={<StyledLabel>Phòng</StyledLabel>} ></TextField>
               <TextField source="rooms" label={<StyledLabel>Tổng số phòng</StyledLabel>} ></TextField>
               <TextField source="location.name" label={<StyledLabel>Địa chỉ</StyledLabel>} ></TextField>
               <TextField source="opening_hours" label={<StyledLabel>Mở cửa</StyledLabel>} ></TextField>
           </SimpleShowLayout>
        </Show>
    );
}
export default TheatreShow;