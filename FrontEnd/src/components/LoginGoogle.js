import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import { loginGoogle } from "../data/data";
import images from "../data/images";

const LoginGoole = (props) => {
  const [loading, setLoading] = useState(true);
  const [messagePayment, setMessagePayment] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);

  // Lấy giá trị của các tham số từ URL
  const sub = params.get("sub");
  const fullName = params.get("fullName");
  const email = params.get("email");

  useEffect(() => {
    loginGoogle(sub, fullName, email)
      .then((data) => {
        if (data.code === 200) {
          Cookies.set("token", data.token, {
            expires: Date.now() + data.tokenExpirationTime,
            path: "/",
          });
          navigate("/home");
        }
        setLoading(false);
      })
      .catch((error) => {
        setMessagePayment("Lỗi đăng nhập!");
        setLoading(false);
      });
  });

  return (
    <Container>
      <PaymentMain>
        <PaymentLogo>
          <a href="#">
            <img src={images.logo} alt="Disney+" />
          </a>
        </PaymentLogo>
        <PaymentHeader>Đang đăng nhập</PaymentHeader>
        <PaymentBody>
          {loading ? (
            <ReactLoading type="spin" color={"#ffff"} width={"15%"} />
          ) : (
            <label>
              {messagePayment}
              <a href="/"> Quay về trang chủ</a>
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

  div {
    margin: 0 45%;
  }

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

export default LoginGoole;
