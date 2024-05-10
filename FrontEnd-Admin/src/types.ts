import {RaRecord} from 'react-admin';

export interface Movie extends RaRecord {
    id: string
    background_img_url: string
    title_img_url: string
    title: string
    released_date: string
    trailer_video_url: string
    poster_url:string
    description:string
    sub_title:string
    age_type: string
    type: string
}

export interface Category extends RaRecord {
    id: string
    name: string
}