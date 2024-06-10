import {
    BooleanInput,
    Create,
    DateTimeInput,
    Edit,
    ImageField, NumberInput, required, SelectInput,
    TabbedForm,
    TextInput, useGetList,
    useRecordContext
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Grid } from "@mui/material";
import {Movie, ShowTime, Theatre} from "../../types";

export const ShowTimeCreate = () => {
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

    const [listMovie, setMovie] = useState<Movie[]>([]);

    const {data: dataMovie}: any = useGetList<Movie>('movies',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'title', order: 'ASC'},
    });
    useEffect(() => {
        if (dataMovie) {
            setMovie(dataMovie);
        }
    }, [dataMovie]);

    return (
        <Create>
            <TabbedForm>
                <TabbedForm.Tab label={"Thông tin suất chiêu"}  sx={{maxWidth: '40em'}}>
                    <Grid container>
                        <SelectInput source={"theatreId"}
                                     label="Rạp"
                                     choices={listTheatre} fullWidth
                                     optionText="name"
                                     optionValue="id"
                        />
                    </Grid>
                    <Grid container>
                        <SelectInput source={"movieId"}
                                     label="Phim"
                                     choices={listMovie} fullWidth
                                     optionText="title"
                                     optionValue="id"
                        />
                    </Grid>
                    <Grid container >
                        <DateTimeInput source="start_time" label={"Giờ bắt đầu"} fullWidth/>
                    </Grid>
                    <Grid container>
                        <DateTimeInput source="end_time" label={"Giờ kết thúc"} fullWidth/>
                    </Grid>
                    <Grid container>
                        <NumberInput source="room" fullWidth/>
                    </Grid>
                    <Grid>
                        <BooleanInput source="status" fullWidth label="Is hidden"/>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    )
}
