import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/" });

// movie
export const getAllMovie = async () => {
  const { data } = await API.get(`movies/all`);
  return data;
};

export const getMovieById = async ({ id }) => {
  const { data } = await API.get(`movies/${id}`);
  return data;
};
