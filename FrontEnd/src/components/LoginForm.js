import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserName } from "../features/user/userSlice";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import { login, register } from "../data/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "../data/images";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const [isLoading, setIsLoading] = useState(false);

  // Login
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const validateLogin = () => {
    if (
      formdata.username === "" ||
      formdata.username === null ||
      formdata.password === "" ||
      formdata.password === null
    ) {
      toast.error("Vui lòng nhập tài khoản và mật khẩu !");
      return false;
    }
    return true;
  };

  const onHandleChange = (e) => {
    setFormdata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);

  const handleAuth = () => {
    setIsLoading(true);

    if (!userName) {
      if (validateLogin()) {
        const id = toast.loading("Đang đăng nhập...", { autoClose: false });
        login(formdata)
          .then((data) => {
            if (data.code === 200) {
              Cookies.set("token", data.token, {
                expires: Date.now() + data.tokenExpirationTime,
                path: "/",
              });
              navigate("/home");
            } else {
              toast.update(id, {
                render: "Tài khoản hoặc mật khẩu không đúng !",
                type: "error",
              });
            }
          })
          .catch((error) => {
            toast.update(id, {
              render: "Đăng nhập không thành công !",
              type: "error",
            });
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(handleAuth);
  };
  // Register

  const [formdataRegister, setFormdataRegister] = useState({
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
  });

  const onHandleChangeRegisterForm = (e) => {
    setFormdataRegister((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const validateRegister = () => {
    if (
      formdataRegister.email === "" ||
      formdataRegister.email === null ||
      formdataRegister.username === "" ||
      formdataRegister.username === null ||
      formdataRegister.password === "" ||
      formdataRegister.password === null ||
      formdataRegister.verifyPassword === "" ||
      formdataRegister.verifyPassword === null
    ) {
      toast.error("Vui lòng nhập đầy đủ các trường !");

      return false;
    }
    if (formdataRegister.password !== formdataRegister.verifyPassword) {
      toast.error("Mật khẩu không khớp !");
      return false;
    }
    return true;
  };

  const registerUser = () => {
    setIsLoading(true);

    if (validateRegister()) {
      const regis = toast.loading("Đang đăng ký !");
      register(formdataRegister)
        .then((data) => {
          if (data.code === 200) {
            Cookies.set("token", data.token, {
              expires: Date.now() + data.tokenExpirationTime,
              path: "/",
            });
            navigate("/home");
          } else {
            toast.update(regis, {
              render: "Tài khoản hoặc email đã tồn tại !",
              type: "warning",
              isLoading: true,
            });
          }
        })
        .catch((error) => {
          toast.update(regis, {
            render: "Đăng ký không thành công !",
            type: "error",
            isLoading: true,
          });
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser);
  };

  return isLogin ? (
    <form>
      <ToastContainer />

      <Login>
        <h2>Đăng nhập</h2>
        <RowInput>
          <label>Tài khoản</label>
          <input
            type="text"
            name="username"
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
          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <ReactLoading type="spin" color={"#ffff"} width={"9%"} />
            ) : (
              "Đăng nhập"
            )}
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
            <a href="https://cinema-logingoogle-production.up.railway.app">
              <img src={images.googleLogo} />
            </a>
          </IconGooge>
        </LoginGoole>
      </Login>
    </form>
  ) : (
    <form>
      <ToastContainer />

      <Login>
        <h2>Đăng Ký</h2>
        <RowInput>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập địa chỉ email"
            onChange={onHandleChangeRegisterForm}
          ></input>
        </RowInput>
        <RowInput>
          <label>Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            placeholder="Nhập tên đăng nhập"
            onChange={onHandleChangeRegisterForm}
          ></input>
        </RowInput>
        <RowInput>
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            maxLength={8}
            placeholder="Nhập mật khẩu"
            onChange={onHandleChangeRegisterForm}
          ></input>
        </RowInput>
        <RowInput>
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            name="verifyPassword"
            maxLength={8}
            placeholder="Nhập lại mật khẩu"
            onChange={onHandleChangeRegisterForm}
          ></input>
        </RowInput>
        <RowInput>
          <button type="submit" onClick={handleRegister}>
            {isLoading ? (
              <ReactLoading type="spin" color={"#ffff"} width={"9%"} />
            ) : (
              "Đăng ký"
            )}
          </button>
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

// Styled component RowInput
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
      rgb(249, 249, 249, 1) 100%
    );
    border: 1px;
    cursor: pointer;
    transition: opacity 0.25s ease-out;

    &:hover {
      opacity: 0.8;
    }

    div {
      margin: 0 auto;
    }
`;

const Register = styled.div`
  display: block !important;
  position: relative;
  width: 100%;
  margin: 20px;

  label {
    position: absolute;
    right: 165px;
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
    margin: 10px;

    img {
      background-repeat: no-repeat;
      width: 45px;
      height: 45px;
    }
  }
`;

export default LoginForm;
