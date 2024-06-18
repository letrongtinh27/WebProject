import * as React from 'react';
import {
    required, TimeInput, useRecordContext,
} from 'react-admin';
import {useEffect, useMemo, useState} from "react";
import {Theatre} from "../../types";
import { parse, format } from 'date-fns';
import {Grid} from "@mui/material";
export const TheatreOpeningHours = () => {
    const record = useRecordContext<Theatre>();
    const [openingHours, setOpeningHours] = useState<Date>();

    useEffect(() => {
        if (record && record.opening_hours) {
            const time = new Date();
            const [hours, minutes] = record.opening_hours.split(':');
            time.setHours(Number(hours));
            time.setMinutes(Number(minutes));
            setOpeningHours(time);
        }
    }, [record]);
    return (
      <Grid container>
          <TimeInput source="Opening_hours" label={"Thời gian mở cửa"} defaultValue={openingHours} fullWidth></TimeInput>
      </Grid>
    );
}

export default TheatreOpeningHours