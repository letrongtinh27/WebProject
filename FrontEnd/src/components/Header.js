import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
import Cookies from "js-cookie";
import { loadDataProfile, searchMovieByName } from "../data/data";
import images from "../data/images";

const Header = ({ updateHeader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const searchResultRef = useRef(null);
  const navRef = useRef(null);
  const [searching, setSearching] = useState(false);
  const [searchName, setSearchName] = useState();
  const [searchMovies, setSearchMovies] = useState([]);
  const [updateHeaders, setUpdateHeaders] = useState(false);

  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    phone: "",
    fullName: "",
    gender: "",
    birthday: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        user,
      })
    );
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      // Cookies.remove("token");
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
      loadDataProfile(token)
        .then((data) => {
          setUserDetail(data);
          setUser(data);
        })
        .catch((error) => {
          Cookies.remove("token");
          setUpdateHeaders(true);
          console.log(error);
        });
    }
    setUpdateHeaders(false);
  }, [isLoggedIn, updateHeader]);

  const signOut = () => {
    if (userDetail.username) {
      Cookies.remove("token");
      dispatch(setSignOutState());
      navigate("/");
      setIsLoggedIn(false);
    }
  };

  const account = () => {
    navigate("/account");
  };

  useEffect(() => {
    // Render lại khi fullName thay đổi
  }, [updateHeader]);

  useEffect(() => {}, [updateHeaders]);
  useEffect(() => {
    searchMovieByName(searchName)
      .then((data) => {
        setSearchMovies(data);
      })
      .catch((error) => {
        setSearchMovies([]);
        console.log(error);
      });
  }, [searchName]);

  const searchHandle = (e) => {
    setSearching(true);
    setSearchName(e.target.value);
  };

  document.addEventListener("click", (e) => {
    if (
      searchResultRef.current &&
      !searchResultRef.current.contains(e.target)
    ) {
      setSearching(false);
    }
  });

  return (
    <Nav>
      <Logo href="/">
        <img src={images.logo} alt="Disney+" />
      </Logo>
      <NavMenu ref={navRef}>
        <a href="/">
          <img src={images.homeIcon} alt="Home" />
          <span>TRANG CHỦ</span>
        </a>
        <a href="/theatre">
          <img src={images.movieIcon} alt="Movie" />
          <span>HỆ THỐNG RẠP</span>
        </a>
        <a>
          <img src={images.searchIcon} alt="Search" />
          <span>TÌM KIẾM</span>
          <Search>
            <input
              onChange={searchHandle}
              type="text"
              autoFocus
              placeholder="Nhập tên phim"
            />
          </Search>
          {searching ? (
            <SearchResult ref={searchResultRef}>
              <ul>
                {searchMovies.map((movie, key) => (
                  <li key={key}>
                    <a href={`/detail/` + movie.id}>
                      <ResultPoster>
                        <img
                          src={movie.poster_url}
                          alt={`${movie.title} poster`}
                        />
                      </ResultPoster>
                      <ResultTitle>
                        {movie.title}
                        <span>Ngày chiếu: {movie.released_date}</span>
                      </ResultTitle>
                    </a>
                  </li>
                ))}
              </ul>
            </SearchResult>
          ) : (
            <></>
          )}
        </a>
      </NavMenu>
      {!isLoggedIn ? (
        <Login href="/login">ĐĂNG NHẬP</Login>
      ) : (
        <>
          <SignOut>
            <p>XIN CHÀO: {userDetail.fullName}</p>
            <DropDown>
              <span onClick={account}>Tài khoản</span>
              <span onClick={signOut}>Đăng xuất</span>
            </DropDown>
          </SignOut>
        </>
      )}
      <MenuLogo>
        <button onClick={showNavbar}>
          <img src={images.menuLogo} />
        </button>
      </MenuLogo>
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

  .responsive_nav {
    display: none;
  }
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

const Search = styled.div`
  display: none;
  opacity: 0;
  input {
    height: 25px;
    width: 200px;
    margin-left: 25px;
    border-style: none;
    font-size: 12px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 10px;
    transition: all 0.5s ease-in-out;
    background-color: rgb(249, 249, 249);
    color: #090b13;
    }
  }
`;

const SearchResult = styled.div`
  position: absolute;
  overflow: auto;
  top: 0;
  margin-top: 70px;
  height: auto;
  max-height: 400px;
  border: 1px solid black;
  background: #fff;
  display: grid;
  opacity: 0.95;

  ul {
    background: rgba(0, 0, 0, 0.95);
    float: left;
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.52);
    margin: 0;
    padding: 0;

    li {
      border-bottom: solid 1px rgba(255, 255, 255, 0.08);
      float: left;
      width: 100%;
      display: block;
      padding: 12px;

      a {
        text-decoration: none;
        cursor: pointer;
      }

      &:hover {
        background: rgba(10, 10, 10, 0.5);
        opacity: 1;
      }
    }
  }
`;

const ResultPoster = styled.div`
  float: left !important;
  display: inline-block !important;
  margin-right: 20px !important;
  width: 55px !important;
  height: 70px !important;
  overflow: hidden !important;

  img {
    margin-top: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

const ResultTitle = styled.div`
  display: flex;
  flex-flow: column;
  letter-spacing: 1.42px;
  margin-top: -40px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

  &.responsive_nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    background-color: #090b13;

    a {
      padding: 10px 36px;
      width: 100%;
    }
  }

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
      ${Search} {
        display: block;
        opacity: 1;
      }
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }

    @media only screen and (max-width: 479px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;

    &:hover {
      ${Search} {
        display: contents !important;
        opacity: 1;
      }
    }

    &.responsive_nav {
      margin: 0;
      padding: 0;
      display: flex;
      width: 100%;
      height: auto;
      position: absolute;
      top: 70px;
      left: 0;
      background-color: #090b13;

      a {
        display: block !important;
        padding: 10px 36px;
        width: 100%;
        position: relative;
        text-align: left;
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
  width: 120px;
  opacity: 0;
  display: grid;

  span {
    color: #f9f9f9;

    &:hover {
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    left: 80%;
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

  p {
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
const MenuLogo = styled.div`
  display: none;
  button {
    background-color: #090b13;
    border: none;
    cursor: pointer;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
  }
  @media only screen and (max-width: 479px) {
    display: block;
  }
`;
export default Header;

// Login redux 1:51:19
