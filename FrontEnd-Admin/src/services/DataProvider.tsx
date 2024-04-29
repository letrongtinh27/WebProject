import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

export const dataProvider: DataProvider = {
// @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {json} = await httpClient(`${apiUrl}/${resource}/all`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
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
        const {json} = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),

            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            // credentials: 'include'
        })
        // switch to window /#/resource
        window.location.href = `/#/${resource}`
        return Promise.resolve({data: json});
        // }
    }
    ,
    update: async (resource: any, params: any) => {
        console.log(params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
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