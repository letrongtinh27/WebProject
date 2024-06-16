import styled from "styled-components";
import Select from "react-select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../data/data";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

import TicketTable from "./TicketTable";
import {
  selectUserId,
  selectUserName,
  selectEmail,
  selectBirthday,
  selectFullName,
  selectGender,
  selectPhone,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = ({ updateHeader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const username = useSelector(selectUserName);
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);
  const birthday = useSelector(selectBirthday);
  const phone = useSelector(selectPhone);
  const gender = useSelector(selectGender);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageBirthday, setMessageBirthday] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  const [password, setPassword] = useState();

  const [userProfile, setUserProfile] = useState({
    id: useSelector(selectUserId),
    username: username,
    fullName: fullName,
    email: email,
    phone: phone,
    gender: gender,
    birthday: birthday,
    changePassword: false,
    password: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = "";

    if (name === "fullName") {
      formattedValue = value;
    } else if (name === "phone") {
      if (isValidPhoneNumber(value)) {
        formattedValue = value;
      }
    } else if (name === "email") {
      if (isValidEmailFormat(value)) {
        formattedValue = value;
        setMessageEmail("");
      } else {
        setMessageEmail("Email không đúng định dạng!");
      }
    }
    // Cập nhật state với giá trị mới
    if (formattedValue !== "") {
      setUserProfile((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
  };

  const onHandleChangeGender = (selectedOption) => {
    setUserProfile((prev) => ({
      ...prev,
      gender: selectedOption.value,
    }));
  };

  const [showPassword, isShowPassword] = useState("password");

  const handleChange = () => {
    if (isChecked) {
      isShowPassword("password");
    } else {
      isShowPassword("text");
    }
    setIsChecked(!isChecked);
  };

  const changePassword = () => {
    let check = !isChangePassword;
    setIsChangePassword(check);
    setUserProfile((prev) => ({
      ...prev,
      changePassword: check,
    }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isValidPassword = (e) => {
    let check = e.target.value === password;
    if (check) {
      setMessagePassword("");
      setUserProfile((prev) => ({
        ...prev,
        password: password,
      }));
    } else {
      setMessagePassword("Mật khẩu không khớp!");
    }
  };

  const checkEditProfile = () => {
    if (
      userProfile.fullName !== fullName ||
      userProfile.email !== email ||
      userProfile.phone !== phone ||
      userProfile.gender !== gender ||
      userProfile.birthday !== birthday ||
      (userProfile.changePassword && userProfile.password !== "")
    ) {
      if (userProfile.email === email) {
        userProfile.email = "";
      }
      return true;
    }

    return false;
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        user,
      })
    );
  };

  const handelEditProfile = () => {
    if (checkEditProfile()) {
      setLoading(true);
      editUserProfile(userProfile, token)
        .then((data) => {
          setLoading(false);
          if (data.code === 400) {
            toast.error(data.message);
          } else {
            setUser(data);
            console.log(data);
            updateHeader();
            setUserProfile((prev) => ({
              ...prev,
              changePassword: false,
            }));
            setPassword("");
            setIsChangePassword(false);
            toast.success("Thay đổi thông tin thành công !");
          }
        })
        .catch((error) => {
          setLoading(false);

          console.error(error);
        });
    }
  };

  const signOut = () => {
    if (username) {
      Cookies.remove("token");
      dispatch(setSignOutState());
      navigate("/");
    }
  };

  const genders = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];
  // kiểm tra định dạng email
  function isValidEmailFormat(email) {
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormatRegex.test(email);
  }

  function isValidDateFormat(dateString) {
    const dateFormatRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateFormatRegex.test(dateString);
  }

  const isValidPhoneNumber = (phone) => {
    if (phone.length > 0 && phone[0] !== "0") {
      phone = "0" + phone;
    }
    if (phone.length < 10 || phone.length > 10) {
      setMessagePhone("Số điện thoại có độ dài là 10 số!");
      return false;
    }
    if (phone.length === 10) {
      setMessagePhone("");
      return true;
    }
    setMessagePhone("Số điện thoại không đúng định dạng!");
    return false;
  };

  const checkBirthday = (e) => {
    const userInput = e.target.value;
    if (!isValidDateFormat(userInput)) {
      setMessageBirthday("Định dạng ngày không đúng (dd-mm-yyyy)");
    } else {
      setUserProfile((pre) => {
        return { ...pre, [e.target.name]: e.target.value };
      });
      setMessageBirthday("");
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200,
      marginBottom: 0,
      borderRadius: "4px",
      backgroundColor: "transparent",
      border: "1px solid #454d6a",
      color: "white",
      width: "100%",
      height: "40px",
      minWitdh: "300px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <Container>
      <AccountTitle>
        <h1>Tài khoản</h1>
      </AccountTitle>
      <AccountContainer>
        <ToastContainer />
        <AccountContent>
          <AccountUsername>
            <h4>
              {username}
              <span onClick={signOut}> Đăng xuất</span>
            </h4>
          </AccountUsername>
          <AccountInformation>
            <ul>
              <li>
                Họ tên:
                <span> {fullName}</span>
              </li>
              <li>
                Sinh nhật:
                <span> {birthday}</span>
              </li>
            </ul>
            <ul>
              <li>
                Email:
                <span> {email}</span>
              </li>
              <li>
                Điện thoại:
                <span> {phone}</span>
              </li>
            </ul>
            <ul>
              <li>
                Giới tính:
                <span> {gender}</span>
              </li>
            </ul>
          </AccountInformation>
          <hr />
          <AccountBody>
            <AccountCol>
              <AccountColInner>
                <p>
                  <label htmlFor="reg_full_name">Họ tên *</label>
                  <input
                    id="reg_full_name"
                    name="fullName"
                    onChange={onHandleChange}
                    type="text"
                    defaultValue={fullName}
                  />
                </p>
              </AccountColInner>
              <AccountColInner>
                <p>
                  <label style={{ left: 0 }} htmlFor="reg_gender">
                    Giới tính *
                  </label>
                </p>
                <StyledSelectContainer>
                  <Select
                    styles={customStyles}
                    id="reg_gender"
                    classNamePrefix="select"
                    isLoading={false}
                    isRtl={false}
                    isSearchable={true}
                    defaultValue={
                      gender === "Nam" ? genders.at(0) : genders.at(1)
                    }
                    options={genders}
                    name="gender"
                    onChange={onHandleChangeGender}
                  />
                </StyledSelectContainer>
              </AccountColInner>
            </AccountCol>
            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_email">
                    Email * <span>{messageEmail}</span>
                  </label>
                  <input
                    id="reg_email"
                    type="email"
                    name="email"
                    onChange={onHandleChange}
                    defaultValue={email}
                  />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountCol style={{ maxWidth: "60%" }}>
              <AccountColInner>
                <p>
                  <label htmlFor="reg_password">Mật khẩu </label>
                  <input
                    disabled
                    id="reg_password"
                    type="password"
                    defaultValue={"**************"}
                  />
                </p>
              </AccountColInner>
              <AccountColInner>
                <p>
                  <a onClick={changePassword}>Đổi mật khẩu</a>
                </p>
              </AccountColInner>
            </AccountCol>
            {isChangePassword ? (
              <ChangePassword>
                {" "}
                <AccountCol style={{ paddingBottom: "0" }}>
                  <AccountColInner>
                    <p>
                      <label htmlFor="reg_changepassword">Mật khẩu mới *</label>
                      <input
                        id="reg_changepassword"
                        onBlur={handleChangePassword}
                        type={showPassword}
                      />
                    </p>
                  </AccountColInner>
                  <AccountColInner>
                    <p>
                      <label htmlFor="reg_changepasswordcomfirm">
                        Nhập lại mật khẩu * <span>{messagePassword}</span>
                      </label>
                      <input
                        id="reg_changepasswordcomfirm"
                        name="password"
                        onChange={isValidPassword}
                        type={showPassword}
                      />
                    </p>
                  </AccountColInner>
                </AccountCol>
                <AccountCol>
                  <ShowPassword>
                    <input
                      id="req_showpassword"
                      type="checkbox"
                      onChange={handleChange}
                    />
                    <label
                      className="label_changepassword"
                      htmlFor="req_showpassword"
                    >
                      Hiện mật khẩu
                    </label>
                  </ShowPassword>
                </AccountCol>
              </ChangePassword>
            ) : (
              ""
            )}

            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_phone">
                    Số điện thoại * <span>{messagePhone}</span>
                  </label>
                  <input
                    id="reg_phone"
                    type="tel"
                    name="phone"
                    onChange={onHandleChange}
                    defaultValue={phone}
                  />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_birthday">
                    Ngày sinh (Ngày-Tháng-Năm) * <span>{messageBirthday}</span>
                  </label>
                  <input
                    id="reg_birthday"
                    type="text"
                    name="birthday"
                    onBlur={checkBirthday}
                    defaultValue={birthday}
                  />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountCol style={{ margin: "0 auto", maxWidth: "20%" }}>
              <AccountColInner>
                <p>
                  <a onClick={handelEditProfile} style={{ width: "100%" }}>
                    {loading ? (
                      <ReactLoading type="spin" color={"#ffff"} width={"15%"} />
                    ) : (
                      "Cập nhật"
                    )}
                  </a>
                </p>
              </AccountColInner>
            </AccountCol>
          </AccountBody>
        </AccountContent>
      </AccountContainer>

      <AccountTitle>
        <h1>Lịch sử giao dịch</h1>
      </AccountTitle>
      <AccountContainer>
        <AccountContent
          style={{
            minHeight: "200px",
            minWidth: "390px",
            padding: 0,
            border: "0px",
            borderRadius: "10px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        >
          <TicketTable></TicketTable>
        </AccountContent>
      </AccountContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center/ cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const AccountTitle = styled.div`
  padding: 40px 0px;
  min-height: auto;
  color: #fff;

  h1 {
    text-transform: uppercase;
    margin: 0px;
    font-size: 1.6rem;
    text-align: center;
  }
`;

const AccountContainer = styled.main`
  position: relative;
  display: block;
`;

const AccountContent = styled.div`
  max-width: 1100px;
  min-width: 390px;
  height: auto;
  border: 1px solid #454d6a;
  border-radius: 5px;
  padding: 25px 0px 0px 0px;
  margin: 0 auto;

  hr {
    border-width: 0;
    border-top: 1px solid;
    border-style: dashed;
    margin: 30px 0;
    border-color: #454d6a;
    opacity: 1;
  }
`;

const AccountUsername = styled.div`
  letter-spacing: 2px;
  h4 {
    color: rgb(249, 249, 249);
    margin-bottom: 15px;
    margin-right: 5px;
    line-height: 21px;

    span {
      font-size: 12.8px;
      font-weight: normal;
      color: red;
      cursor: pointer;
    }
  }
`;

const AccountInformation = styled.div`
  margin-bottom: 10px;

  ul {
    margin: 0 0 5px;
    padding: 0;
    list-style: none;

    li {
      letter-spacing: 1.5px;

      display: inline;
      color: #fff;
      margin: 0 30px 0 0;

      span {
        letter-spacing: 1.5px;
        color: #00b4d8;
      }
    }
  }
`;

const AccountBody = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
`;

const StyledSelectContainer = styled.div`
  width: 97%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AccountCol = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  padding: 0 4px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 10px 20px;
    max-width: 100% !important;

    .label_changepassword {
      top: auto !important;
    }
  }
`;

const AccountColInner = styled.div`
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1 0 50%;
  margin-right: 0;
  position: relative;
  width: 100%;

  p {
    margin-bottom: 15px;
    width: 100%;

    label {
      position: absolute;
      top: -15px;
      left: auto;
      color: #fff;
      font-weight: normal;
      margin-bottom: 10px;
      font-size: 15px;
    }

    input {
      padding: 15px;
      margin-bottom: 0;
      border-radius: 4px;
      background-color: transparent;
      border: 1px solid #454d6a;
      color: white;
      width: 95%;
      height: 40px;
      min-width: 300px;
    }

    a {
      display: block;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 15px;
      padding: 8px 0;
      width: 66%;
      height: 40px;
      border-radius: 5px;
      color: #fff;
      background: #454d6a;
      &:hover {
        background: #616161;
      }

      div {
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    flex: 1 0 100%;
    width: 100%;
    input {
      width: 100% !important;
    }
  }
`;

const AccountColM2 = styled.div`
  display: flex;
  flex-basis: 50%;
  max-width: 100%;
  margin-bottom: 0;
  padding: 0 0px 20px;
  }
`;

const AccountColInnerM2 = styled.div`
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1 0 auto;
  margin-right: 0;
  position: relative;
  width: 100%;

  p {
    margin-bottom: 15px;
    width: 100%;

    label {
      position: absolute;
      top: -15px;
      left: auto;
      color: #fff;
      font-weight: normal;
      margin-bottom: 10px;
      font-size: 15px;

      span {
        color: red;
      }
    }

    input {
      padding: 15px;
      margin-bottom: 0;
      border-radius: 4px;
      background-color: transparent;
      border: 1px solid #454d6a;
      color: white;
      width: 96.5%;
      height: 40px;
      min-width: 300px;
    }
  }
`;

const ChangePassword = styled.div`
  transition: transform 0.3s ease-in-out;
  transform: translateY(-10px);
`;

const ShowPassword = styled.div`
  input {
    display: inline-block;
    margin-right: 0;
    width: 40px;
    height: 20px;
  }

  label {
    position: absolute;
    top: 75px;
    color: #fff;
    font-size: 14px;
  }
`;

export default Account;

export { AccountTitle };
