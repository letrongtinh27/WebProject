import { styled } from '@mui/material/styles';
import {
    Show,
    SimpleShowLayout,
    ImageField,
    TextField,
    DateField,
    ArrayField,
    Datagrid,
    useRecordContext
} from 'react-admin';
import {Movie} from "../../types";

const StyledLabel = styled('span')({
    fontSize: '20px',
    fontWeight: 'bold',
});

const MovieShow = (props: any) => {
    const MovieTitle = () => {
        const record = useRecordContext<Movie>();
        return record ? <span>{record.title}</span> : null;
    };

    return (
        <Show title={<MovieTitle />}>
            <SimpleShowLayout>
                <ImageField source="background_img_url" label={<StyledLabel>Background</StyledLabel>} />
                <ImageField source="title_img_url" label={<StyledLabel>Title Image</StyledLabel>} />
                <ImageField source="poster_url" label={<StyledLabel>Poster</StyledLabel>} />
                <TextField source="title" label={<StyledLabel>Title</StyledLabel>} />
                <TextField source="trailer_video_url" label={<StyledLabel>Link trailer</StyledLabel>} />
                <TextField source="description" label={<StyledLabel>Description</StyledLabel>} />
                <TextField source="sub_title" label={<StyledLabel>Sub</StyledLabel>} />
                <TextField source="age_type" label={<StyledLabel>Age Type</StyledLabel>} />
                <TextField source="type" label={<StyledLabel>Type</StyledLabel>} />
                <DateField source="released_date" label={<StyledLabel>Released Date</StyledLabel>} />
                <TextField source="type" label={<StyledLabel>Type</StyledLabel>} />
                <TextField source="is_active" label={<StyledLabel>Status</StyledLabel>} />
                <ArrayField source="categories" label={<StyledLabel>Categories</StyledLabel>}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="name" textAlign="center"/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
}

export default MovieShow;
