import {
    CheckboxGroupInput,
    Create,
    DateTimeInput,
    Edit,
    ImageField, ImageInput, required, SelectInput,
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

export const MovieCreate = (props: any) => {
    const choices = [
        { id: 'PG', name: 'PG' },
        { id: 'PG-13', name: 'PG-13' },
        { id: 'NC-17', name: 'NC-17' },
        { id: 'G', name: 'G' },
        { id: 'R', name: 'R' },
    ];
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
        <Create>
    <TabbedForm>
        <TabbedForm.Tab
            label="Ảnh"
    sx={{maxWidth: '40em'}}
>
    <Grid container columnSpacing={2}>
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
            <SelectInput
                source="age_type"
                fullWidth
                label="Age"
                choices={choices}
                {...props}
            />
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
            <CheckboxGroupInput
                source="category"
                label="Danh mục"
                choices={category}
                optionText="name"
                optionValue="id"
                fullWidth
                row={false}
                validate={req}
            />
    </TabbedForm.Tab>

    </TabbedForm>
    </Create>
);
}

const req = [required()];
export default MovieCreate;