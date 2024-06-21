import {
    Edit, ImageField, ImageInput, NumberInput,
    TabbedForm,
    TextInput,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";
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

export const TheatreEdit = (props: any) => {
    const NameTheatre = () => {
        const record = useRecordContext<Theatre>();
        return record ? record.name : null;
    }

    return(
        <Edit title={<NameTheatre/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Thông tin rạp"
                    sx={{maxWidth: '40em'}}
                >
                   <Grid container >
                       <TextInput source="name" label={"Tên rạp"} fullWidth></TextInput>
                   </Grid>

                    <Grid container >
                        <TextInput source="address" label={"Địa chỉ"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="phone_number" label={"Số điện thoại"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="email" label={"Email"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <TextInput source="description" label={"Mô tả"} fullWidth></TextInput>
                    </Grid>
                    <Grid container >
                        <NumberInput source="room_summary" label={"Phòng"} fullWidth></NumberInput>
                    </Grid>
                    <Grid container >
                        <NumberInput source="rooms" label={"Tổng số phòng"} fullWidth></NumberInput>
                    </Grid>
                    <TheatreLocation/>
                    <TheatreOpeningHours/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Thông tin rạp"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container >
                        <ImageUploader source="image" label="Image" />
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
}

interface ImageUploaderProps {
    source: string;
    label: string;
}

export default TheatreEdit;