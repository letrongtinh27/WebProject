import {
    BooleanInput,
    CheckboxGroupInput,
    Create,
    DateTimeInput,
    Edit,
    ImageField, ImageInput, required, SelectInput,
    TabbedForm, TextField,
    TextInput, useGetList,
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Grid } from "@mui/material";
import {Category, Movie} from "../../types";
import {MovieCategory} from "../movie/MovieCategory"
import {useWatch} from "react-hook-form";
import Typography from "@mui/material/Typography";

const ImageUploader: React.FC<ImageUploaderProps> = ({ source, label }) => {
    const isReturned = useWatch({ name: source });
    const newSource = `${source}_new`;

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {label}:
            </Typography>
            <ImageInput
                source={newSource}
                accept="image/*"
                placeholder={<p>Add new Avt Img</p>}
                label={`Thêm ảnh ${label} mới`}
            >
                <ImageField
                    source="src"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '5px',
                        marginBottom: '5px',
                        maxHeight: '100px',
                    }}
                />
            </ImageInput>
        </>
    )
};


export const MovieCreate = (props: any) => {
    const choices = [
        { id: 'PG', name: 'PG' },
        { id: 'PG-13', name: 'PG-13' },
        { id: 'NC-17', name: 'NC-17' },
        { id: 'G', name: 'G' },
        { id: 'R', name: 'R' },
    ];
    const Type = [
        {id: 'new', name: 'new'},
        {id: 'newreleases', name: 'new releases'},
        {id: 'commingsoon', name: 'comming soon'},
        ]
    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    console.log("Data" , data)
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
        <Grid item xs={12} sm={12} container>
            <ImageUploader source="background_img_url" label="Background" />
            <ImageUploader source="title_img_url" label="Title Image" />
            <ImageUploader source="poster_url" label="Poster" />
        </Grid>
        </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab
    label="Chi tiết"
    sx={{maxWidth: '40em'}}
>
    <Grid container >
    <TextInput source="title" fullWidth label="title"/>
        </Grid>
        <Grid container>
    <TextInput source="trailer_video_url" fullWidth label="link trailer"/>
        </Grid>
        <Grid container >
    <TextInput source="description" fullWidth multiline minRows={4} maxRows={4}
    style={{overflow: "auto"}} label="description"/>
        </Grid>
        <Grid container >
    <TextInput source="sub_title" fullWidth label="sub" />
        </Grid>
        <Grid container >
            <SelectInput
                source="age_type"
                fullWidth
                label="Age"
                choices={choices}
                {...props}
            />
        </Grid>
        <Grid container>
            <SelectInput source="type" fullWidth label="Type" choices={Type}/>
    <TextInput source="type" fullWidth label="type"/>
        </Grid>
        <Grid container >

    <DateTimeInput source="released_date" fullWidth label="released date"/>
        </Grid>
            <Grid container >
                <BooleanInput source="is_active" fullWidth label={"Is hidden"}/>
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
interface ImageUploaderProps {
    source: string;
    label: string;
}

const req = [required()];
export default MovieCreate;