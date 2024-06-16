import {
    DateField,
    ImageField, NumberInput, required, Show, SimpleShowLayout,
    TabbedForm, TextField,
    TextInput, useGetList,
    useRecordContext
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Grid } from "@mui/material";
import {ShowTime} from "../../types";
import {ShowTimeFilm} from "./ShowTimeFilm";
import {ShowTimeTheatre} from "./ShowTimeTheatre";
import ShowTimeList from "./ShowTimeList";
// import {} from "../movie/"
import { styled } from '@mui/material/styles';
import { DateTimeField } from '@mui/x-date-pickers';
import {format} from "date-fns";

const StyledLabel = styled('span')({
    fontSize: '20px',
    fontWeight: 'bold',
});

export const ShowTimeShow = () => {
    const CustomDateField: React.FC<CustomDateFieldProps> = ({ source, label }) => {
        const record = useRecordContext();
        const date = record ? record[source] : null;
        const formattedDate = date ? format(new Date(date), 'dd/MM/yyyy HH:mm') : '';

        return (
            <div>
                <span>{formattedDate}</span>
            </div>
        );
    };
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
        <Show title={<ShowTimeTitle />}>
            <SimpleShowLayout>
                <TextField source="movie.title" label={<StyledLabel>Title</StyledLabel>} />
                <TextField source="theatre.name" label={<StyledLabel>Film</StyledLabel>} />
                {/*<TextField source="start_time" label={<StyledLabel>Giờ bắt đầu</StyledLabel>} />*/}
                {/*<TextField source="end_time" label={<StyledLabel>Giờ kết thúc</StyledLabel>} />*/}
                <CustomDateField source="start_time" label={<StyledLabel>Giờ bắt đầu</StyledLabel>}/>
                <CustomDateField source="end_time" label={<StyledLabel>Giờ kết thúc</StyledLabel>}/>
                <TextField source="room" label={<StyledLabel>Room</StyledLabel>} />
                <TextField source="status" label={<StyledLabel>Is Hidden</StyledLabel>} />
            </SimpleShowLayout>
        </Show>
    )
}

interface CustomDateFieldProps {
    source: string;
    label: any;
}


export default ShowTimeShow;
