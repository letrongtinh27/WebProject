import {
    DateTimeInput,
    Edit,
    ImageField, ImageInput, required,
    TabbedForm,
    TextInput, useGetList,
    useRecordContext
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Grid } from "@mui/material";
import {Category, Movie} from "../../types";
import {MovieCategory} from "../movie/MovieCategory"

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

export const MovieShow = (props: any) => {
    const MovieTitle = () => {
        const record = useRecordContext<Movie>();
        return record ? <span>{record.title}</span> : null;
    };


    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    return (
        <Edit title={<MovieTitle/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        {/*<ImageInput source="img_new"/>*/}
                        <Grid item xs={12} sm={12}>
                            <ImageField source="background_img_url" label="Back ground"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="title_img_url" src="url" label="image"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="poster_url" src="url" label="poster"/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <TextInput source="title" fullWidth label="title"/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="trailer_video_url" fullWidth label="link trailer"/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="description" fullWidth multiline minRows={4} maxRows={4}
                                   style={{overflow: "auto"}} label="description"/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="sub_title" fullWidth label="sub" />
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="age_type" fullWidth label="age"/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <TextInput source="type" fullWidth label="type"/>
                    </Grid>
                    <Grid container columnSpacing={2}>
                        <DateTimeInput source="released_date" fullWidth label="released date"/>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Thể loại"
                    sx={{maxWidth: '100%'}}
                >
                    <MovieCategory/>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    );
}

const req = [required()];
export default MovieShow;