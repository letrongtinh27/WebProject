import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5173/api/"});

export const login = async (authenticationRequest) => {
    const {data} = await API.post(`auth/login_admin`, authenticationRequest);
    return data;
};

