import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.fullname = action.payload.full_name;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;

      console.log("UserSlice User: " + state.name);
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

export const selectUserName = (state) => (state.user ? state.user.name : "");
export const selectEmail = (state) => (state.user ? state.user.email : "");
export const selectPhone = (state) => (state.user ? state.user.phone : "");
export const selectFullName = (state) =>
  state.user ? state.user.fullname : "";
export const selectGender = (state) => (state.user ? state.user.gender : "");
export const selectBirthday = (state) =>
  state.user ? state.user.birthday : "";

export default userSlice.reducer;
