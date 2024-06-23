import axios from "axios";

const API = axios.create({
  baseURL: "https://cinema-server-production-0b4b.up.railway.app/api/",
});

// movie
export const getAllMovie = async () => {
  try {
    const response = await API.get(`movies/all`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const getMovieById = async ({ id }) => {
  try {
    const response = await API.get(`movies/${id}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const searchMovieByName = async (name) => {
  try {
    const response = await API.get(`movies/search?name=` + name);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

// theatre
export const getAllTheatre = async () => {
  try {
    const response = await API.get(`theatres/all`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const getTheatreById = async ({ id }) => {
  try {
    const response = await API.get(`theatres/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// authen
export const login = async (authenticationRequest) => {
  try {
    const response = await API.post(`auth/login`, authenticationRequest);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const register = async (registerRequest) => {
  try {
    const response = await API.post(`auth/register`, registerRequest);
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const loginGoogle = async (sub, fullName, email) => {
  try {
    const response = await API.get(
      `auth/login-google?sub=${sub}&fullName=${fullName}&email=${email}`
    );
    return response.data;
  } catch (error) {
    // console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const resetPassword = async (resetPasswordRequest) => {
  try {
    const response = await API.post(
      `auth/reset-password`,
      resetPasswordRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
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
    // console.error("Error fetching profile data:", error);
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
    // console.error("Error fetching profile data:", error);
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
    // console.error("Error fetching profile data:", error);
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
    // console.error("Error fetching profile data:", error);
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
    // console.error("Error fetching profile data:", error);
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

// GoogleMap
export const geocode = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: "AIzaSyBA-wMiHOMAOZuB8ngN1xv0p-9dViRnVeA",
        },
      }
    );

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Không tìm thấy vị trí");
    }
  } catch (error) {
    console.error("Lỗi khi lấy tọa độ:", error);
    return null;
  }
};
