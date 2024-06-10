import * as React from 'react';
import {
    CheckboxGroupInput,
    required, SelectInput,
    useGetList, useRecordContext,
} from 'react-admin';
import {useEffect, useMemo, useState} from "react";
import {Category, Location, Movie, ShowTime, Theatre} from "../../types";
import {Grid} from "@mui/material";

export const ShowTimeFilm = () => {
    const [listMovie, setMovie] = useState<Movie[]>([]);

    const {data}: any = useGetList<Movie>('movies',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'title', order: 'ASC'},
    });
    useEffect(() => {
        if (data) {
            setMovie(data);
        }
    }, [data]);
    console.log(data)

    const record = useRecordContext<ShowTime>()
    const defaultMovie = useMemo(() => {
        if (record) {
            return record.movie.id;
        }
        return null;
    }, [record]);
    console.log(record)

    const defaultTheatre = useMemo(() => {
        if (record) {
            return record.theatreId;
        }
        return null;
    }, [record]);

    return (
        <Grid container>
            <SelectInput source={"movieId"}
                         label="Phim"
                         choices={listMovie} fullWidth
                         optionText="title"
                         optionValue="id"
                         defaultValue={defaultMovie}
            />
        </Grid>
    );
};
const req = [required()];