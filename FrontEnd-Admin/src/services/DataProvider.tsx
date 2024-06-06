import {DataProvider, fetchUtils} from 'react-admin'
import {log} from "util";
import {imgProvider} from "./ImgProvider";
// const apiUrl = 'https://cinema-server-production-0b4b.up.railway.app/api'
const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

let token = localStorage.getItem("admin")


// httpClient.interceptors.response.use(
//     response => response,
//     async error => {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             }).then((response: any) => {
//                 console.log(response)
//                 Promise.resolve();
//             }).catch((error) => {
//                 if (error.response.status === 400) {
//                     // @ts-ignore
//                     authProvider.logout();
//                     window.location.href = '/#/login';
//                     return Promise.reject({message: "Your session is expired. Please login again."});
//                 }
//             });
//         } else {
//             if (error.response.status === 400) {
//                 // @ts-ignore
//                 authProvider.logout();
//                 window.location.href = '/#/login';
//                 return Promise.reject({message: "Your session is expired. Please login again."});
//             }
//             return Promise.reject({message: "There was an error. Please try again."});
//         }
//     }
// )

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
            if (resource === 'category') {
                const {json} = await httpClient(`${apiUrl}/${resource}`, {
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
            }
            const {json} = await httpClient(`${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`, {
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
            }),
        });
        return { data: json };
    },


    // @ts-ignore
    create: async (resource: any, params: any) => {
        let background = null;
        let poster = null;
        let titleimg = null;
        let movie;
        let theatre;
        let categories
        console.log(params)
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
            console.log(params)

            const {json} = await httpClient(`${apiUrl}/${resource}/`, {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include'
            });
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        if (resource === 'movies') {
            if (params.data.background_img_url_new != undefined && params.data.background_img_url_new != null ) {
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
                categories: { id: number; name: null }[];
            } = {
                background_img_url: background =! null ? background : params.data.background_img_url || '',
                title_img_url: titleimg != null ? titleimg : params.data.title_img_url || '',
                title: params.data.title,
                released_date: new Date(params.data.released_date).toLocaleDateString('sv-SE'),
                trailer_video_url: params.data.trailer_video_url || '',
                poster_url: poster != null ? poster : params.data.trailer_video_url || '',
                description: params.data.description,
                sub_title: params.data.sub_title,
                age_type: params.data.age_type,
                type: params.data.type,
                categories: params.data.category.map((categoryId: number) => ({
                    id: categoryId,
                    name: ""
                }))
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
        if (resource === 'shows') {

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
        let background = null;
        let titleimg = null;
        let poster = null;
        console.log(resource)
        console.log(params)
        let category;

        if (resource === 'movies') {
            if (params.data.background_img_url_new != undefined && params.data.background_img_url_new != null ) {
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
                categories: { id: number; name: null }[];
            } = {
                background_img_url: background =! null ? background : params.data.background_img_url || '',
                title_img_url: titleimg != null ? titleimg : params.data.title_img_url || '',
                title: params.data.title,
                released_date: new Date(params.data.released_date).toLocaleDateString('sv-SE'),
                trailer_video_url: params.data.trailer_video_url || '',
                poster_url: poster != null ? poster : params.data.trailer_video_url || '',
                description: params.data.description,
                sub_title: params.data.sub_title,
                age_type: params.data.age_type,
                type: params.data.type,
                categories: params.data.category.map((categoryId: number) => ({
                    id: categoryId,
                    name: ""
                }))
            }
            console.log(data)
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

        }
        if (resource === 'theatres') {
            const data = {
                location_id: params.data.locations_id,
                name: params.data.name,
                address: params.data.address,
                phone_number: params.data.phone_number,
                email: params.data.email,
                description: params.data.description,
                room_summary: params.data.room_summary,
                opening_hours: new Date(params.data.Opening_hours).toLocaleTimeString('en-GB', {hour12: false}),
                rooms: params.data.rooms
            }
            console.log(params)
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
        }


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