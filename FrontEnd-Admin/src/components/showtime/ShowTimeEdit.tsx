import {
    BooleanInput,
    DateTimeInput,
    Edit,
    ImageField, NumberInput, required,
    TabbedForm,
    TextInput, useGetList,
    useRecordContext
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Grid } from "@mui/material";
import {ShowTime} from "../../types";
import {ShowTimeFilm} from "./ShowTimeFilm";
import {ShowTimeTheatre} from "./ShowTimeTheatre";
// import {} from "../movie/"


export const ShowTimeEdit = () => {
    const ShowTimeTitle = () => {
        const record = useRecordContext<ShowTime>();
        if (!record) {
            return null;
        }
        const { movie, theatre } = record;
        const title = movie?.title || '';
        const name = theatre?.name || '';
        return `${name} - ${title}`;
    };

    return (
     <Edit title={<ShowTimeTitle/>}>
         <TabbedForm>
             <TabbedForm.Tab label={"Thông tin suất chiêu"}  sx={{maxWidth: '40em'}}>
                 <ShowTimeFilm/>
                 <ShowTimeTheatre/>
                 <Grid container >
                     <DateTimeInput source="start_time" label={"Giờ bắt đầu"} fullWidth/>
                 </Grid>
                 <Grid container>
                     <DateTimeInput source="end_time" label={"Giờ kết thúc"} fullWidth/>
                 </Grid>
                 <Grid container>
                     <NumberInput source="room" fullWidth/>
                 </Grid>
                 <Grid container>
                     <BooleanInput source="status" fullWidth label={"Is hidden"}/>
                 </Grid>
             </TabbedForm.Tab>
         </TabbedForm>
     </Edit>
    )
}
