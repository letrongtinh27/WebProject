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
    is_active: number
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
    rooms: string,
    image: string
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

export interface Ticket extends RaRecord {
    id: string
    show_time_id: number
    seat: number
    reservation_id: number
    ticket_code: string
    price: number
}

