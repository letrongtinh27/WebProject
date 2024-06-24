import axios from "axios";
import { AuthProvider, fetchUtils } from "react-admin";


import Cookies from "js-cookie"
// const apiUrl = 'http://localhost:8080/api'
const apiUrl = 'https://cinema-server-production-0b4b.up.railway.app/api'


let token = localStorage.getItem("admin");
// const httpClient = axios.create({
//     baseURL: apiUrl,
// });

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject({ message: error.response.data.message });
    }
  }
);

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    await httpClient
      .post(
        `${apiUrl}/auth/login_admin`,
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response);
          localStorage.setItem("admin", response.data.token);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject({ message: error.response.data.message });
      });
  },
  logout: async () => {
    await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/sign-out`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    localStorage.removeItem("admin");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("admin") ? Promise.resolve() : Promise.reject(),

  getPermissions: async () => {
    // await httpClient.get(`${process.env.REACT_APP_API_URL}/user/get-authorities`, {
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    // }).then((response) => {
    //     if (response.status === 200) {
    //         return Promise.resolve(response.data);
    //     }
    // }).catch(async (error) => {
    //     if (error.status === 401) {
    //         await httpClient.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true
    //         }).then((response: any) => {
    //             console.log(response)
    //             Promise.resolve();
    //         }).catch((error) => {
    //             console.log(error)
    //             // @ts-ignore
    //             return authProvider.logout();
    //         })
    //     } else {
    //         console.log(error)
    //         return Promise.reject({message: error.response.data.message});
    //     }
    // });
  },
  //@ts-ignore
  getIdentity: async () => {
    const token = localStorage.getItem("admin");
    if (!token) {
      return Promise.reject();
    }
    try {
      const response = await httpClient.get(`${apiUrl}/users/profile`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        Cookies.set("role", response.data.role);
        const parts = response.data.birthday.split("-");
        return Promise.resolve({
          id: response.data.id,
          birthday: new Date(parts[2], parts[1] - 1, parts[0]),
          email: response.data.email,
          fullName: response.data.fullName,
          gender: response.data.gender === "Nam" ? 0 : 1,
          phone: response.data.phone,
          username: response.data.username,
        });
      } else {
        await authProvider.logout(token);
      }
    } catch (error) {
      await authProvider.logout(token);
      window.location.href = "/#/login";
    }
  },
  //@ts-ignore
  update: async (resource: any, params: any) => {
    console.log(params);
    const token = localStorage.getItem("admin");
    if (!token) {
      return Promise.reject();
    }
    try {
      const response = await httpClient.post(
        `${apiUrl}/users/edit`,
        JSON.stringify(params),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return Promise.resolve({ data: response });

      window.location.href = "#/profile";
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  },
};
