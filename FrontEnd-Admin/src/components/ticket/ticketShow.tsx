import {
    Show, SimpleShowLayout,
    TextField,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Ticket} from "../../types";


export const TicketShow = (props: any) => {
    const NameTicket = () => {
        const record = useRecordContext<Ticket>();
        return record ? record.ticket_code : null;
    }

    return(
        <Show>
            <SimpleShowLayout>
                <TextField source="id" label="ID"/>
                <TextField source="showTime.movie_st.title" label="Movie"/>
                <TextField source="showTime.theatre_name.name" label="Theatre"/>
                <TextField source="seat.row_char" label="Row"/>
                <TextField source="seat.seat_number" label="Number"/>
            </SimpleShowLayout>
        </Show>
    );
}
export default TicketShow;