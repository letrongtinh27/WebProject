import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  phone: "",
  fullname: "",
  gender: "",
  birthday: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      const { id, username, email, phone, fullName, gender, birthday } =
        action.payload.user;
      if (id !== undefined) state.id = id;
      if (username !== undefined) state.username = username;
      if (email !== undefined) state.email = email;
      if (phone !== undefined) state.phone = phone;
      if (fullName !== undefined) state.fullname = fullName;
      if (gender !== undefined) state.gender = gender;
      if (birthday !== undefined) state.birthday = birthday;
    },

    setSignOutState: (state) => {
      state.username = null;
      state.email = null;
      state.phone = null;
      state.fullname = null;
      state.gender = null;
      state.birthday = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

// Sửa lại các hàm select để truy cập vào trạng thái của slice\
export const selectUserId = (state) => state.user.id;
export const selectUserName = (state) => state.user.username;
export const selectEmail = (state) => state.user.email;
export const selectPhone = (state) => state.user.phone;
export const selectFullName = (state) => state.user.fullname;
export const selectGender = (state) => state.user.gender;
export const selectBirthday = (state) => state.user.birthday;

export default userSlice.reducer;
