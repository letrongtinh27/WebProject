import {DataProvider, fetchUtils} from 'react-admin'
import {log} from "util";

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

let token = localStorage.getItem("admin")
export const dataProvider: DataProvider = {
// @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
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
        // try {
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