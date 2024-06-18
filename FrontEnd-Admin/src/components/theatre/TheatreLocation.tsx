import * as React from 'react';
import {
    CheckboxGroupInput,
    required, SelectInput,
    useGetList, useRecordContext,
} from 'react-admin';
import {useEffect, useMemo, useState} from "react";
import {Category, Location, Movie, Theatre} from "../../types";
import {Grid} from "@mui/material";

export const TheatreLocation = () => {
    const [location, setLocations] = useState<Location[]>([]);
    const {data}: any = useGetList<Location>('locations',{
        pagination: {page: 1, perPage: 100},
        // sort: {field: 'name', order: 'ASC'},
    });
    useEffect(() => {
        if (data) {
            setLocations(data);
        }
    }, [data]);

    const record = useRecordContext<Theatre>()
    const defaultLocation = useMemo(() => {
        if (record && record.location) {
            return record.location.id;
        }
        return null;
    }, [record]);

    return (
        <Grid  container>
            <SelectInput source="locations_id"
                         label="Khu vực"
                         choices={location} fullWidth
                         optionText="address"
                         optionValue="id"
                         defaultValue={defaultLocation}
            />
        </Grid>
    );
};
const req = [required()];