import {
    Create,
    Edit, ImageField, ImageInput, NumberInput, SelectInput,
    TabbedForm,
    TextInput, TimeInput, useGetList,
    useRecordContext,
} from 'react-admin';

import React, {useEffect, useMemo, useState} from "react";
import {Grid } from "@mui/material";
import {Location, Theatre} from "../../types";
import {TheatreLocation} from "./TheatreLocation";

import TheatreList from "./TheatreList";
import TheatreOpeningHours from "./TheatreOpeningHours";
import Typography from "@mui/material/Typography";


export const TheatreCreate = (props: any) => {
    const [location, setLocations] = useState<Location[]>([]);
    const {data}: any = useGetList<Location>('locations',{
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setLocations(data);
        }
    }, [data]);

    return(
        <Create>
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
                    <Grid  container >
                        <SelectInput source="locations_id"
                                     label="Khu vực"
                                     choices={location} fullWidth
                                     optionText="address"
                                     optionValue="id"
                        />
                    </Grid>
                    <Grid container >
                        <TimeInput source="Opening_hours" label={"Thời gian mở cửa"} fullWidth/>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Thông tin rạp"
                    sx={{maxWidth: '40em'}}>
                    <Grid  container >
                        <Typography variant="h6" gutterBottom>
                            Image:
                        </Typography>
                        <ImageInput
                            source="image"
                            accept="image/*"
                            placeholder={<p>Add new Avt Img</p>}
                            label={`Thêm ảnh mới`}
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
                    </Grid>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    );
}
export default TheatreCreate;