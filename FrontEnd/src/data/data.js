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

// theatre
export const getAllTheatre = async () => {
  const { data } = await API.get(`theatres/all`);
  return data;
};

// authen
export const login = async (authenticationRequest) => {
  const { data } = await API.post(`auth/login`, authenticationRequest);
  return data;
};

export const register = async (registerRequest) => {
  const { data } = await API.post(`auth/register`, registerRequest);
  return data;
};

// user
export const loadDataProfile = async (token) => {
  try {
    const response = await API.get(`users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// shows
export const getShowsByMovieIdAndTheatreId = async (
  movieId,
  theatreId,
  date
) => {
  const { data } = await API.get(
    `shows/get?movieId=${movieId}&theatreId=${theatreId}&date=${date}`
  );
  return data;
};

// seats
export const getSeatsByShowTime = async (
  showTimeId,
  theatreId,
  room,
  token
) => {
  // const { data } = await API.get(
  //   `seats/get/${showTimeId}/${theatreId}/${room}`
  // );
  // return data;

  try {
    const response = await API.get(
      `seats/get/${showTimeId}/${theatreId}/${room}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// payment
export const payment = async (booking, token) => {
  try {
    const response = await API.post(`payment/pay`, booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};
