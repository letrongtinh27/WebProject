import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setSignOutState,
  selectUserName,
  selectFullName,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { loadDataProfile } from "../data/data";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userDetail, setUserDetail] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        username: user.username,
        email: user.email,
        phone: user.phone,
        fullname: user.full_name,
        gender: user.gender,
        birthday: user.birthday,
      })
    );
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
      loadDataProfile(token)
        .then((data) => {
          setUserDetail(data);
          setUser(userDetail);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  const signOut = () => {
    if (userDetail.username) {
      dispatch(setSignOutState());
      navigate("/");
      setIsLoggedIn(false);
    }
  };

  const account = () => {
    navigate("/account");
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      <NavMenu>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="Home" />
          <span>TRANG CHỦ</span>
        </a>
        <a href="/movie">
          <img src="/images/movie-icon.svg" alt="Movie" />
          <span>PHIM</span>
        </a>
        <a href="/search">
          <img src="/images/search-icon.svg" alt="Search" />
          <span>TÌM KIẾM</span>
        </a>
      </NavMenu>
      {!isLoggedIn ? (
        <Login href="/login">ĐĂNG NHẬP</Login>
      ) : (
        <>
          <SignOut>
            <h8>XIN CHÀO: {userDetail.full_name}</h8>
            <DropDown>
              <span onClick={account}>Account</span>
              <span onClick={signOut}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 100px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  display: grid;

  span {
    color: #f9f9f9;
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 400px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  h8 {
    color: #f9f9f9;
    letter-spacing: 3px;
    font-weight: bold;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;

// Login redux 1:51:19
