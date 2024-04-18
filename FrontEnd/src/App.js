import React from "react";
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

function App() {
  const checkToken = localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={checkToken ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
