import {
    Show, SimpleShowLayout,
    TextField,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Ticket} from "../../types";
import {styled} from "@mui/material/styles";

const StyledLabel = styled('span')({
    fontSize: '20px',
    fontWeight: 'bold',
});
export const TicketShow = (props: any) => {
    return(
        <Show>
            <SimpleShowLayout>
                <TextField
                    source="id"
                    label={<StyledLabel>ID</StyledLabel>}
                />
                <TextField
                    source="showTime.movie.title"
                    label={<StyledLabel>Movie</StyledLabel>}
                />
                <TextField
                    source="showTime.theatre.name"
                    label={<StyledLabel>Theatre</StyledLabel>}
                />
                <TextField
                    source="seat.row_char"
                    label={<StyledLabel>Row</StyledLabel>}
                />
                <TextField
                    source="seat.seat_number"
                    label={<StyledLabel>Number</StyledLabel>}
                />
                <TextField
                    source="ticketCode"
                    label={<StyledLabel>ticketCode</StyledLabel>}
                />
            </SimpleShowLayout>
        </Show>
    );
}
export default TicketShow;