import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Detail from "./components/Detail";
import Booking from "./components/Booking";
import "./App.css";
import { selectUserName } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import Payment from "./components/Payment";
import Account from "./components/Account";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import LoginGoole from "./components/LoginGoogle";
import Theatre from "./components/Theatre";
import TheatreDetail from "./components/TheatreDetail";
import ResetPassword from "./components/ResetPassword";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASBDMWMRPZREmwFP8pTzcFZXvUfwecHs0",
  authDomain: "cinema-945d3.firebaseapp.com",
  projectId: "cinema-945d3",
  storageBucket: "cinema-945d3.appspot.com",
  messagingSenderId: "823462420068",
  appId: "1:823462420068:web:df1163916c3db8fe258971",
  measurementId: "G-3SN1FMV12S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const checkAccount = useSelector(selectUserName) != "" ? true : false;

  const [updateHeader, setUpdateHeader] = useState(false);

  // Hàm để cập nhật thông tin tài khoản và render lại Header
  const updateAccountAndHeader = () => {
    setUpdateHeader((prev) => !prev); // Cập nhật state để render lại Header
  };

  return (
    <div className="App">
      <Router>
        <Header updateHeader={updateHeader} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login-google"
            element={checkAccount ? <Navigate to="/home" /> : <LoginGoole />}
          />
          <Route
            path="/login"
            element={checkAccount ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/theatreDetail/:id" element={<TheatreDetail />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/theatre" element={<Theatre />} />
          <Route path="/payment-callback" element={<Payment />} />
          <Route
            path="/account"
            element={
              checkAccount ? (
                <Account updateHeader={updateAccountAndHeader} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/reset-password"
            element={checkAccount ? <Navigate to="/home" /> : <ResetPassword />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
