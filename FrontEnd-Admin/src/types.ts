import {RaRecord} from 'react-admin';
import { format } from 'date-fns';
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

export interface Theatre extends RaRecord {
    id: string
    location_id: string
    name: string
    address: string
    phone_number: string
    email: string
    description: string
    room_summary: string
    opening_hours: string
    rooms: string
}

export interface Location extends RaRecord {
    id: string
    name: string
    address: string
}
export interface ShowTime extends RaRecord {
    id: string
    movieId: number
    theatreId: number
    room: number
    start_time: string
    end_time: string
    movie_st: any
    theatre_name: any
}
export interface User extends RaRecord {
    id: number
    user: string
    email: string
    phone_number: string
    full_name: string
    gender: string
    birthday: string
    role: string
}

