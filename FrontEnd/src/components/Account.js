import styled from "styled-components";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TicketTable from "./TicketTable";
import {
  selectUserId,
  selectUserName,
  selectEmail,
  selectBirthday,
  selectFullName,
  selectGender,
  selectPhone,
} from "../features/user/userSlice";

const Account = (props) => {
  const username = useSelector(selectUserName);
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);
  const birthday = useSelector(selectBirthday);
  const phone = useSelector(selectPhone);
  const gender = useSelector(selectGender);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
    setIsChangePassword(!isChangePassword);
  };

  const showPw = () => {
    isShowPassword("text");
  };

  const genders = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
    { value: "Khác", label: "Khác" },
  ];

  function toDateInputValue(dateObject) {
    const local = new Date(dateObject);
    local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200,
      "margin-bottom": 0,
      "border-radius": "4px",
      "background-color": "transparent",
      border: "1px solid #454d6a",
      color: "white",
      width: "100%",
      height: "40px",
      "min-width": "300px",
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
        <AccountContent>
          <AccountUsername>
            <h4>
              {username}
              <span> Đăng xuất</span>
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

                <Select
                  styles={customStyles}
                  id="reg_gender"
                  classNamePrefix="select"
                  isLoading={false}
                  isRtl={false}
                  isSearchable={true}
                  defaultValue={genders.at(0)}
                  options={genders}
                  name="gender"
                />
              </AccountColInner>
            </AccountCol>
            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_email">Email *</label>
                  <input id="reg_email" type="email" defaultValue={email} />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountCol style={{ maxWidth: "60%" }}>
              <AccountColInner>
                <p>
                  <label htmlFor="reg_password">Mật khẩu </label>
                  <input
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
                        type={showPassword}
                        defaultValue={fullName}
                      />
                    </p>
                  </AccountColInner>
                  <AccountColInner>
                    <p>
                      <label htmlFor="reg_changepasswordcomfirm">
                        Nhập lại mật khẩu *
                      </label>
                      <input
                        id="reg_changepasswordcomfirm"
                        type={showPassword}
                        defaultValue={fullName}
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

                    <label htmlFor="req_showpassword">Hiện mật khẩu</label>
                  </ShowPassword>
                </AccountCol>
              </ChangePassword>
            ) : (
              ""
            )}

            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_phone">Số điện thoại *</label>
                  <input id="reg_phone" type="tel" defaultValue={phone} />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountColM2>
              <AccountColInnerM2>
                <p>
                  <label htmlFor="reg_birthday">Ngày sinh *</label>
                  <input
                    id="reg_birthday"
                    type="date"
                    defaultValue={toDateInputValue(new Date())}
                  />
                </p>
              </AccountColInnerM2>
            </AccountColM2>
            <AccountCol style={{ margin: "0 auto", maxWidth: "20%" }}>
              <AccountColInner>
                <p>
                  <a style={{ width: "100%" }}>Cập nhật</a>
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
  min-width: 500px;
  max-height: 950px;
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

const AccountCol = styled.div`
display: flex;
flex-basis: 50%;
max-width: 50%;
  margin-bottom: 0;
  padding: 0 4px 20px;
  }
`;

const AccountColInner = styled.div`
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
