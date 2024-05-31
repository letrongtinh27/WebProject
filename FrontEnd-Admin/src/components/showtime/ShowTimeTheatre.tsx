import * as React from 'react';
import {
    required, SelectInput,
    useGetList, useRecordContext,
} from 'react-admin';
import {useEffect, useMemo, useState} from "react";
import {Movie, ShowTime, Theatre} from "../../types";
import {Grid} from "@mui/material";

export const ShowTimeTheatre = () => {
    const [listTheatre, setListTheatre] = useState<Theatre[]>([]);

    const {data}: any = useGetList<Movie>('theatres',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    useEffect(() => {
        if (data) {
            setListTheatre(data);
        }
    }, [data]);


    const record = useRecordContext<ShowTime>()
    const defaultTheatre = useMemo(() => {
        if (record) {
            return record.theatre.id;
        }
        return null;
    }, [record]);

    return (
        <Grid container>
            <SelectInput source={"theatreId"}
                         label="Rạp"
                         choices={listTheatre} fullWidth
                         optionText="name"
                         optionValue="id"
                         defaultValue={defaultTheatre}
            />
        </Grid>
    );
};
const req = [required()];