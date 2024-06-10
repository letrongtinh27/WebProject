import {
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
import {useWatch} from "react-hook-form";
import Typography from "@mui/material/Typography";

const ImageUploader: React.FC<ImageUploaderProps> = ({ source, label }) => {
    const isReturned = useWatch({ name: source });
    const newSource = `${source}_new`;

    return isReturned ? (
        <>
            <Typography variant="h6" gutterBottom>
                {label}:
            </Typography>
            <ImageField
                source={source}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5px',
                    marginBottom: '5px',
                    maxHeight: '100px',
                }}
            />
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
    ) : (
        <ImageInput name={source} source={source}>
            <ImageField source="src" label={label} />
        </ImageInput>
    );
};

// const ReturnedImg1 = () => {
//     const isReturned = useWatch({name: 'background_img_url'});
//     return isReturned ?
//         <>
//             <ImageField source="background_img_url" sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: "5px",
//                 marginBottom: "5px",
//                 maxHeight: "100px"
//             }}/>
//             <ImageInput source="background_img_url_new" accept="image/*"
//                         placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Background mới"}>
//                 <ImageField source="src" sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "5px",
//                     marginBottom: "5px",
//                     maxHeight: "100px"
//                 }}/>
//             </ImageInput>
//         </> : <ImageInput name={"background_img_url"} source={"background_img_url"}>
//             <ImageField source="src" label="Background"/>
//         </ImageInput>;
// };
// const ReturnedImg2 = () => {
//     const isReturned = useWatch({name: 'title_img_url'});
//     return isReturned ?
//         <>
//             <ImageField source="title_img_url" sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: "5px",
//                 marginBottom: "5px",
//                 maxHeight: "100px"
//             }}/>
//             <ImageInput source="title_img_url_new" accept="image/*"
//                         placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Title mới"}>
//                 <ImageField source="src" sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "5px",
//                     marginBottom: "5px",
//                     maxHeight: "100px"
//                 }}/>
//             </ImageInput>
//         </> : <ImageInput name={"title_img_url"} source={"title_img_url"}>
//             <ImageField source="src" label="Title Image"/>
//         </ImageInput>;
// };
// const ReturnedImg3 = () => {
//     const isReturned = useWatch({name: 'poster_url'});
//     return isReturned ?
//         <>
//             <ImageField source="poster_url" sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: "5px",
//                 marginBottom: "5px",
//                 maxHeight: "100px"
//             }}/>
//             <ImageInput source="poster_url_new" accept="image/*"
//                         placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Poster mới"}>
//                 <ImageField source="src" sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "5px",
//                     marginBottom: "5px",
//                     maxHeight: "100px"
//                 }}/>
//             </ImageInput>
//         </> : <ImageInput name={"poster_url"} source={"poster_url"}>
//             <ImageField source="src" label="Poster"/>
//         </ImageInput>;
// };

export const MovieEdit = (props: any) => {
    const choices = [
        { id: 'PG', name: 'PG' },
        { id: 'PG-13', name: 'PG-13' },
        { id: 'NC-17', name: 'NC-17' },
        { id: 'G', name: 'G' },
        { id: 'R', name: 'R' },
    ];
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
                        <ImageUploader source="background_img_url" label="Background" />
                        <ImageUploader source="title_img_url" label="Title Image" />
                        <ImageUploader source="poster_url" label="Poster" />
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
                    <Grid container columnSpacing={2}>
                        <TextInput source="type" fullWidth label="type"/>
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

interface ImageUploaderProps {
    source: string;
    label: string;
}

const req = [required()];
export default MovieEdit;

