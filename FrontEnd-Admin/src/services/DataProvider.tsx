import {DataProvider, fetchUtils} from 'react-admin'
import {log} from "util";
import {imgProvider} from "./ImgProvider";
import axios from "axios";
const apiUrl = 'https://cinema-server-production-0b4b.up.railway.app/api'
// const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

let token = localStorage.getItem("admin")

async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result.split(',')[1])
        }
        reader.onerror = reject
    })
}

export const dataProvider: DataProvider = {
// @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;

            const query = {
                filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
                sort: field,
                order: order,
                page: page - 1,
                perPage: perPage,
            };
            if (resource === 'category' || resource === 'locations' || resource === 'theatres/all') {
                const {json} = await httpClient(`${apiUrl}/${resource}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }),
                })
                return {
                    data: json,
                    total: json.length,
                }
            }
            if (resource === 'movies/all_filter' || resource === 'users/all' || resource === 'tickets/all' ||  resource === 'shows/all') {
                const query1 = {filter: JSON.stringify(fetchUtils.flattenObject(params.filter))}
                const {json} = await httpClient(`${apiUrl}/${resource}?${fetchUtils.queryParameters(query1)}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }),
                })
                return {
                    data: json,
                    total: json.length,
                }
            }
            const {json} = await httpClient(`${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
            })

            return {
                        data: json.content,
                        total: parseInt(json.totalElements, 10),
            }

        } catch (err: any) {
            console.error("Error fetching data:", err);
        }
    },

    getOne: async (resource: any, params: any) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        });
        return { data: json };
    },


    // @ts-ignore
    create: async (resource: any, params: any) => {
        let background = null;
        let poster = null;
        let titleimg = null;
        let imageTheatre = null;
        let movie;
        let theatre;
        let categories
        if (resource === 'users') {
            const data = {
                username: params.data.user,
                email: params.data.email,
                password: params.data.password,
                phone_number: params.data.phone_number,
                full_name: params.data.full_name,
                gender: params.data.gender,
                birthday: params.data.birthday,
                role: params.data.role
            }

            const {json} = await httpClient(`${apiUrl}/${resource}/admin_create`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(data),
                credentials: 'include'
            });
            if (json.code === 400) {
                alert(`Lỗi ${json.code}: ${json.message}`);
                return Promise.reject(json);
            }

            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        if (resource === 'theatres') {
            console.log(params)
            if (params.data.image !== undefined && params.data.image !== null) {
                let img = null;
                await getBase64(params.data.image.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                imageTheatre = await imgProvider(img);
            }
            const data = {
                location_id: params.data.locations_id,
                name: params.data.name,
                address: params.data.address,
                phone_number: params.data.phone_number,
                email: params.data.email,
                description: params.data.description,
                room_summary: params.data.room_summary,
                opening_hours:new Date(params.data.Opening_hours).toLocaleTimeString('en-GB', { hour12: false }),
                rooms: params.data.rooms,
                image: imageTheatre !== null ? imageTheatre : ''
            }
            console.log(data)

            const {json} = await httpClient(`${apiUrl}/${resource}/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(data),
                credentials: 'include'
            });
;
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        if (resource === 'movies') {
            if (params.data.background_img_url_new !== undefined && params.data.background_img_url_new !== null) {
                let img = null;
                await getBase64(params.data.background_img_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                background = await imgProvider(img);
            }
            if (params.data.title_img_url_new != undefined && params.data.title_img_url_new != null) {
                let img = null;
                await getBase64(params.data.title_img_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                titleimg = await imgProvider(img);
            }
            if (params.data.poster_url_new != undefined && params.data.poster_url_new != null) {
                let img = null;
                await getBase64(params.data.poster_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                poster = await imgProvider(img);
            }
            const data: {
                background_img_url: string;
                title_img_url: string;
                title: string;
                released_date: string;
                trailer_video_url: string;
                poster_url: string;
                description: string;
                sub_title: string;
                age_type: string;
                type: string;
                is_active: number;
                categories: {
                    id: number;
                    name: null
                }[];
            } = {
                background_img_url: background != null ? background : params.data.background_img_url || '',
                title_img_url: titleimg != null ? titleimg : params.data.title_img_url || '',
                title: params.data.title,
                released_date: new Date(params.data.released_date).toLocaleDateString('sv-SE'),
                trailer_video_url: params.data.trailer_video_url || '',
                poster_url: poster != null ? poster : params.data.poster_url || '',
                description: params.data.description,
                sub_title: params.data.sub_title,
                age_type: params.data.age_type,
                type: params.data.type,
                is_active: params.data.is_active ? 1 : 0,
                categories: params.data.category.map((categoryId: number) => ({
                    id: categoryId,
                    name: ""
                }))
            }
            console.log(data)
            const {json} = await httpClient(`${apiUrl}/${resource}/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            });
            return Promise.resolve({data: json});
        }

            if (resource === 'shows') {
            const {data: movie} = await dataProvider.getOne('movies', {id: params.data.movieId})
            const {data: theatre} = await dataProvider.getOne('theatres', {id: params.data.theatreId})
            const data = {
                start_time: params.data.start_time,
                end_time: params.data.end_time,
                room: params.data.room,
                status: params.data.status ? 1 : 0,
                movie: movie,
                theatre: theatre
            }
            const json = await axios.create({
                baseURL: "http://localhost:8080/api/",
            }).post(`shows/`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            window.location.href = `/#/${resource}`;
            return Promise.resolve({ data: json.data });

        }

            const {json} = await httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            credentials: 'include'
        })
        window.location.href = `/#/${resource}`
        return Promise.resolve({data: json});
    }
    ,
    update: async (resource: any, params: any) => {
        let background = null;
        let titleimg = null;
        let poster = null;
        let imageTheatre = null;

        if (resource === 'movies') {
            if (params.data.background_img_url_new !== undefined && params.data.background_img_url_new !== null ) {
                let img = null;
                await getBase64(params.data.background_img_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                background = await imgProvider(img);
            }
            if (params.data.title_img_url_new != undefined && params.data.title_img_url_new != null ) {
                let img = null;
                await getBase64(params.data.title_img_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                titleimg = await imgProvider(img);
            }
            if (params.data.poster_url_new != undefined && params.data.poster_url_new != null ) {
                let img = null;
                await getBase64(params.data.poster_url_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                poster = await imgProvider(img);
            }
            const data: {
                background_img_url: string;
                title_img_url: string;
                title: string;
                released_date: string;
                trailer_video_url: string;
                poster_url: string;
                description: string;
                sub_title: string;
                age_type: string;
                type: string;
                is_active: number;
                categories: { id: number; name: null }[];
            } = {
                background_img_url: background != null ? background : params.data.background_img_url || '',
                title_img_url: titleimg != null ? titleimg : params.data.title_img_url || '',
                title: params.data.title,
                released_date: new Date(params.data.released_date).toLocaleDateString('sv-SE'),
                trailer_video_url: params.data.trailer_video_url || '',
                poster_url: poster != null ? poster : params.data.poster_url || '',
                description: params.data.description,
                sub_title: params.data.sub_title,
                age_type: params.data.age_type,
                type: params.data.type,
                is_active: params.data.is_active ? 1: 0 ,
                categories: params.data.category.map((categoryId: number) => ({
                    id: categoryId,
                    name: ""
                }))
            }
            console.log(data)
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            });
            return Promise.resolve({ data: json });

        }
        if (resource === 'theatres') {
            console.log(params)
            if (params.data.image_new !== undefined && params.data.image_new !== null) {
                let img = null;
                await getBase64(params.data.image_new.rawFile)
                    .then(res => {
                        img = res;
                    })
                    .catch(err => console.log(err))
                imageTheatre = await imgProvider(img);
            }
            const data = {
                location_id: params.data.locations_id,
                name: params.data.name,
                address: params.data.address,
                phone_number: params.data.phone_number,
                email: params.data.email,
                description: params.data.description,
                room_summary: params.data.room_summary,
                opening_hours: new Date(params.data.Opening_hours).toLocaleTimeString('en-GB', {hour12: false}),
                rooms: params.data.rooms,
                image: imageTheatre !== null ? imageTheatre : params.data.image || ''
            }
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            });
            return Promise.resolve({ data: json });
        }
        if (resource === 'shows') {
            const {data: movie} = await dataProvider.getOne('movies', {id: params.data.movieId})
            const {data: theatre} = await dataProvider.getOne('theatres', {id: params.data.theatreId})

            const data = {
                start_time: params.data.start_time,
                end_time: params.data.end_time,
                room: params.data.room,
                status: params.data.status ? 1 : 0,
                movie: movie,
                theatre: theatre
            }
            const json = await axios.create({
                baseURL: "http://localhost:8080/api/",
            }).put(`shows/${params.id}`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
            }
                )
                return Promise.resolve({ data: json.data });
        }

        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            credentials: 'include'
        });
        return Promise.resolve({ data: json });
    },


    delete: async (resource: any, params: any) => {
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            // credentials: 'include'
        })
        return Promise.resolve({data: json});
    },

}