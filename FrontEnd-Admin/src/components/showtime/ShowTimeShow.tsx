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

const StyledLabel = styled('span')({
    fontSize: '20px',
    fontWeight: 'bold',
});

export const ShowTimeShow = () => {
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
                <DateField source="start_time" label={<StyledLabel>Giờ bắt đầu</StyledLabel>} />
                <DateField source="end_time" label={<StyledLabel>Giờ kết thúc</StyledLabel>} />
                <TextField source="room" label={<StyledLabel>Room</StyledLabel>} />
                <TextField source="status" label={<StyledLabel>Is Hidden</StyledLabel>} />
            </SimpleShowLayout>
        </Show>
    )
}

export default ShowTimeShow;
