import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

import usersData from "../mockdata/mockData.json";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    username: "",
  });

  const validate = () => {
    let result = true;
    if (formdata.email === "" || formdata.email === null) {
      result = false;
      alert("Nhap email");
    }
    if (formdata.password === "" || formdata.password === null) {
      result = false;
      alert("Nhap mat khau");
    }
    return result;
  };

  const onHandleChange = (e) => {
    setFormdata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.username,
        email: user.email,
        photo: null,
      })
    );
  };

  const handleAuth = () => {
    if (!userName) {
      if (validate()) {
        const loggedInUser = usersData.users.find(
          (user) =>
            user.email === formdata.email && user.password === formdata.password
        );

        if (loggedInUser) {
          setUser(loggedInUser);
          navigate("/home");
        } else {
          alert("đăng nhập không thành công");
        }
      }
    } else if (userName) {
      dispatch(setSignOutState());
      navigate("/");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(handleAuth);
  };

  return isLogin ? (
    <form>
      <Login>
        <h2>Đăng nhập</h2>
        <RowInput>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={onHandleChange}
            placeholder="Nhập địa chỉ email"
          ></input>
        </RowInput>
        <RowInput>
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            onChange={onHandleChange}
            placeholder="Nhập mật khẩu"
          ></input>
        </RowInput>
        <RowInput>
          <button type="submit" onClick={handleLogin}>
            Đăng nhập
          </button>
        </RowInput>
        <RowInput>
          <a href="/reset-password">Quên mật khẩu</a>
        </RowInput>
        <Register>
          <label>Chưa có tài khoản</label>
          <a
            type="submit"
            onClick={(e) => {
              setIsLogin(false);
            }}
          >
            Đăng ký
          </a>
        </Register>
        <LoginGoole>
          <label>Đăng nhập bằng:</label>
          <IconGooge>
            <a href="#">
              <img src="./images/Google__G__logo.svg" />
            </a>
          </IconGooge>
        </LoginGoole>
      </Login>
    </form>
  ) : (
    <form>
      <Login>
        <h2>Đăng Ký</h2>
        <RowInput>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập địa chỉ email"
          ></input>
        </RowInput>
        <RowInput>
          <label>Họ tên</label>
          <input type="text" name="full-name" placeholder="Nhập Họ tên"></input>
        </RowInput>
        <RowInput>
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
          ></input>
        </RowInput>
        <RowInput>
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="Nhập lại mật khẩu"
          ></input>
        </RowInput>
        <RowInput>
          <button type="submit">Đăng ký</button>
        </RowInput>
        <Register>
          <label>Đã có tài khoản</label>
          <a
            type="submit"
            onClick={(e) => {
              setIsLogin(true);
            }}
          >
            Đăng nhập
          </a>
        </Register>
      </Login>
    </form>
  );
};

const Login = styled.div`
  min-width: 300px;
  min-height: 500px;
  width: 30%;
  height: auto;
  margin: 5% auto;
  background-color: rgba(0, 0, 0, 0.75);
  border: 1px solid #000;
  border-radius: 25px;

  h2 {
    text-align: center;
    padding: 0.1rem;
    font-size: 2rem;
    color: #f9f9f9;
  }
`;

const RowInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.1rem;
    max-width: 100%;

    label {
        align-self: start;
        padding-left: 3rem;
        padding-bottom: 0.5rem;
        color: #f9f9f9;
        font-size: 17px;
      }

      a {
        color: red;
        cursor: pointer;
         }

    input {
        width: 80%;
        height: 30px;
        box-sizing: border-box;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        padding-left: 1.5rem;
        box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2);
        transition: box-shadow 0.2s ease-in;

    &:focus {
      box-shadow: inset 0px -3px 0px 0px rgba(34, 193, 195, 0.7);
      outline: none;
    }

    &::-webkit-input-placeholder {
      opacity: 1;
      transition: opacity 0.25s ease-out;
    }

    &:hover::-webkit-input-placeholder,
    &:focus::-webkit-input-placeholder {
      opacity: 0;
    }
    }
    button {
        border-radius: 25px;
        width: 80%;
        height: 40px;
        margin: 20px;
        font-size: 1.3rem;
        color: #f9f9f9;
        font-weight: 700;
        background: rgb(34, 193, 195);
        background: linear-gradient(
          90deg,
          rgb(0, 0, 0) 0%,
          rgb(249, 249, 249,1) 100%
        );
        border: 1px;
        cursor: pointer;
        transition: opacity 0.25s ease-out;
      
        &:hover {
          opacity: 0.8;
        }
`;

const Register = styled.div`
  display: block !important;
  position: relative;
  width: 100%;
  margin: 20px;
  label {
    position: absolute;
    right: 140px;
  }

  a {
    padding-top: 0rem !important;
    color: rgb(34, 193, 195);
    position: absolute;
    right: 30px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const LoginGoole = styled.div`
  text-align: center;
  padding-top: 40px;
  margin-top: 10px;
`;

const IconGooge = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 0;

  a {
    margin: 0 10px;
    img {
      background-repeat: no-repeat;
      width: 45px;
      height: 45px;
    }
  }
`;

export default LoginForm;
