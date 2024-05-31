import {DataProvider, fetchUtils} from 'react-admin'
import {log} from "util";
// const apiUrl = 'https://cinema-server-production-0b4b.up.railway.app/api'
const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

let token = localStorage.getItem("admin")
export const dataProvider: DataProvider = {
// @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            console.log(token)
            const {json} = await httpClient(`${apiUrl}/${resource}/all`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
            })
            console.log("Json: ", json)
            console.log("Content: ", json.content)

            return {
                data: json,
                total: json.length,
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
            }),
        });
        console.log("Params: ", params)
        console.log("Data:", json)
        return { data: json };
    },

    // @ts-ignore
    create: async (resource: any, params: any) => {
        console.log(params)
        console.log(params.data)
        console.log(resource)
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
            console.log(data)

            const {json} = await httpClient(`${apiUrl}/${resource}/admin_create`, {
                method: 'POST',
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
        console.log(params)
        if (resource === 'theatres') {
            const data = {
                location_id: params.data.locations_id,
                name: params.data.name,
                address: params.data.address,
                phone_number: params.data.phone_number,
                email: params.data.email,
                description: params.data.description,
                room_summary: params.data.room_summary,
                opening_hours:new Date(params.data.Opening_hours).toLocaleTimeString('en-GB', { hour12: false }),
                rooms: params.data.rooms
            }
            console.log(data)

            const {json} = await httpClient(`${apiUrl}/${resource}/`, {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include'
            });
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        if (resource === 'showtime') {

        }

        const {json} = await httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data),

            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            // credentials: 'include'
        })
        window.location.href = `/#/${resource}`
        return Promise.resolve({data: json});
        // }
    }
    ,
    update: async (resource: any, params: any) => {
        console.log(resource)
        console.log(params)
        let category;
        if (resource === 'users') {
            console.log(params.data)
            const formData = new FormData();
            // formData.append('user', params.data.user || '');
            // formData.append('email', params.data.email || '');
            // formData.append('password', params.data.password || '');
            // formData.append('phone_number', params.data.phone_number || '');
            // formData.append('full_name', params.data.fullName || '');
            // formData.append('gender', params.data.gender || '');
            // formData.append('birthday', params.data.birthday|| '');
            // formData.append('role', params.data.role || '');
            // console.log(formData)
        }
        // if (resource === 'movies') {
        //     console.log(params)
        //     const formData = new FormData();
        //
        //     formData.append('background_img_url',params.background_img_url || '');
        //     formData.append('title_img_url',params.title_img_url || '');
        //     formData.append('poster_url',params.poster_url || '');
        //     formData.append('title',params.title || '');
        //     formData.append('trailer_video_url',params.trailer_video_url || '');
        //     formData.append('sub_title',params.sub_title || '');
        //     formData.append('age_type',params.age_type || '');
        //     formData.append('type',params.type || '');
        //     formData.append('released_date',params.released_date || '');
        //     formData.append('description',params.description || '');
        //
        //     console.log(formData)
        //     if (formData.entries().next().done) {
        //         console.error('FormData is empty');
        //         return Promise.reject('FormData is empty');
        //     }
        //     const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //         method: 'PUT',
        //         body: formData,
        //         credentials: 'include'
        //     });
        //
        //     window.location.href = `/#/${resource}`;
        //     return Promise.resolve({data: json});
        // }
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        });
        return Promise.resolve({ data: json });
    },


    delete: async (resource: any, params: any) => {
        console.log(params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            // credentials: 'include'
        })
        return Promise.resolve({data: json});
    },

}