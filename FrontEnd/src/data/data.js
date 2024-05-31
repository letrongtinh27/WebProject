import axios from "axios";

const API = axios.create({
  baseURL: "https://cinema-server-production-0b4b.up.railway.app/api/",
});

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

export const editUserProfile = async (profile, token) => {
  try {
    const response = await API.post(`users/edit`, profile, {
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
  try {
    if (!movieId || !theatreId || !date) {
      // Nếu có bất kỳ tham số nào là undefined, không gọi API và return ngay lập tức
      return [];
    }
    const response = await API.get(
      `shows/get?movieId=${movieId}&theatreId=${theatreId}&date=${date}`
    );
    return response.data;
  } catch (error) {
    // Bắt lỗi và không throw error ra ngoài
    console.error("Error fetching shows:", error);
    return [];
  }
};

// seats
export const getSeatsByShowTime = async (
  showTimeId,
  theatreId,
  room,
  token
) => {
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

export const paymentCallback = async (vnp_TxnRef, vnp_ResponseCode, token) => {
  try {
    const response = await API.get(
      `payment/payment-callback?vnp_TxnRef=` +
        vnp_TxnRef +
        `&vnp_ResponseCode=` +
        vnp_ResponseCode,
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

// Ticket
export const getTicketByUserID = async (userId, token) => {
  try {
    if (!userId) {
      // Nếu có bất kỳ tham số nào là undefined, không gọi API và return ngay lập tức
      return [];
    }
    const response = await API.get(`tickets/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Bắt lỗi và không throw error ra ngoài
    console.error("Error fetching shows:", error);
    return [];
  }
};
