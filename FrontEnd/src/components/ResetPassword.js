import styled from "styled-components";
import React from "react";
import { useState } from "react";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "../data/images";
import { resetPassword } from "../data/data";

const ResetPassword = (props) => {
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
  });

  const validateLogin = () => {
    if (
      formdata.username === "" ||
      formdata.username === null ||
      formdata.email === "" ||
      formdata.email === null
    ) {
      toast.error("Vui lòng nhập tài khoản và email !");
      return false;
    }
    return true;
  };

  const onHandleChange = (e) => {
    setFormdata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const ResetPasswordHandle = () => {
    setLoading(true);
    if (validateLogin()) {
      resetPassword(formdata)
        .then((data) => {
          setLoading(false);
          if (data.code == 200) {
            toast.success("Mật khẩu mới đã được gửi vào email của tài khoản!");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <PaymentMain>
        <PaymentLogo>
          <a href="#">
            <img src={images.logo} alt="Disney+" />
          </a>
        </PaymentLogo>
        <PaymentHeader>Quên mật khẩu</PaymentHeader>
        <PaymentBody>
          {loading ? (
            <ReactLoading type="spin" color={"#ffff"} width={"15%"} />
          ) : (
            <label>
              <RowInput>
                <label>Tài khoản</label>
                <input
                  type="text"
                  name="username"
                  onChange={onHandleChange}
                  placeholder="Nhập tên đăng nhập"
                ></input>
              </RowInput>
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
                <button onClick={ResetPasswordHandle}>Xác nhận</button>
              </RowInput>
            </label>
          )}
        </PaymentBody>
      </PaymentMain>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 15px;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2025;
`;

const PaymentMain = styled.div`
  position: absolute;
  top: 20%;
  width: 420px;
  height: 200px;
`;

const PaymentLogo = styled.div`
  padding: 20px;
  width: 100%;
  text-align: center;
  a {
    outline: 0;
    img {
      width: 50%;
      vertical-align: middle;
    }
  }
`;

const PaymentHeader = styled.div`
  text-align: center;
  color: #ced4da;
  font-size: 18;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 15px;
`;

const PaymentBody = styled.div`
  background: #343a40;
  border-radius: 5px;
  overflow: hidden;
  padding: 15px;

  label {
    color: #f9f7f3;
    font-size: 14px;
    margin-top: 5px;

    a {
      font-size: 14px;
      margin-top: 5px;
      color: #90be6d;
      cursor: pointer;
    }
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

  // Styled button với hiệu ứng loading

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
  }
`;

export default ResetPassword;
