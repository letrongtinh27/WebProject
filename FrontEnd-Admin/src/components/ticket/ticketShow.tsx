import {
    Show, SimpleShowLayout,
    TextField,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Ticket} from "../../types";


export const TicketShow = (props: any) => {
    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id" label="ID"/>
                <TextField source="showTime.movie.title" label="Movie"/>
                <TextField source="showTime.theatre.name" label="Theatre"/>
                <TextField source="seat.row_char" label="Row"/>
                <TextField source="seat.seat_number" label="Number"/>
            </SimpleShowLayout>
        </Show>
    );
}
export default TicketShow;