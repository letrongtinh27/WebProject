import styled from "styled-components";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSeatsByShowTime } from "../data/data";

const Booking = (props) => {
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(3);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị từ các tham số truy vấn
  const movieId = sessionStorage.getItem("movieId");
  const showTimeId = sessionStorage.getItem("showTimeId");
  const theatreId = sessionStorage.getItem("theatreId");
  const room = sessionStorage.getItem("room");

  // useEffect(() => {
  //   // Khởi chạy một hàm setInterval cập nhật biến timeRemaining mỗi giây
  //   const intervalId = setInterval(() => {
  //     setTimeRemaining((time) => {
  //       if (time <= 1) {
  //         alert("Đã hết thời gian đặt");
  //         clearInterval(intervalId); // Xóa interval khi đếm đến 0
  //         navigate("/"); // Chuyển hướng sau khi thời gian hết
  //       }
  //       return time - 1;
  //     });
  //   }, 1000);

  //   // Dọn dẹp interval khi component bị unmount
  //   return () => clearInterval(intervalId);
  // }, [navigate]);

  useEffect(() => {
    getSeatsByShowTime(showTimeId, theatreId, room)
      .then((data) => {
        setSeatsData(data);
      })

      .catch((error) => {
        console.error(error);
      });
  });

  function handleSelectedState(seatId) {
    const isSelected = selectedSeats.includes(seatId);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  }

  return (
    <Container>
      <Book>
        <Left>
          <img src="/images/movie2.jpg" alt="" />
          <Infor>
            <h3>Đạo diễn</h3>
            <p>Denis Vileneuve</p>
            <h3>Thời lượng</h3>
            <p>167 phút</p>
            <h3>Time</h3>
            <p>{timeRemaining} giây</p>
          </Infor>
        </Left>
        <Right>
          <ShowCase>
            <SeatListItem>
              <SeatBaner className="seat" /> <SmallText>Còn trống</SmallText>
            </SeatListItem>
            <SeatListItem>
              <SeatBaner className="seat selected" />{" "}
              <SmallText>Đang chọn</SmallText>
            </SeatListItem>
            <SeatListItem>
              <SeatBaner className="seat occupied" />{" "}
              <SmallText>Đã đặt</SmallText>
            </SeatListItem>
          </ShowCase>

          <Cinema>
            <Screen />
            <SeatsContainer>
              {seatsData.map(({ id, seatNumber, booked }) => {
                const isSelected = selectedSeats.includes(id);
                return (
                  <Seat
                    key={id}
                    tabIndex="0"
                    className={clsx(
                      "seat",
                      isSelected && "selected",
                      booked && "occupied"
                    )}
                    onClick={!booked ? () => handleSelectedState(id) : null}
                  >
                    {seatNumber}
                  </Seat>
                );
              })}
            </SeatsContainer>
            <SubmitButton>Xác nhận</SubmitButton>
          </Cinema>
        </Right>
      </Book>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 15px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2025;
`;

const Book = styled.div`
  width: 65%;
  height: 75%;
  display: flex;
`;

const Left = styled.div`
  width: 20%;
  position: relative;
  height: 100%;
  border: 1px solid #fff;

  img {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 80%;
  position: relative;
  height: 100%;
  border: 1px solid #fff;
  padding: 10px 40px;
  background: unset;
`;

const Infor = styled.div`
  color: #fff;
  padding: 0 20px;
`;

const ShowCase = styled.ul`
  margin: 0 0 48px;
  list-style: none;
  display: flex;
  justify-content: center;
  background: #3b3b3b;
  padding: 12px;
  border-radius: 4px;
  color: #7e7e7e;
`;

const SeatListItem = styled.li`
  margin: 0 12px;
`;

const SeatBaner = styled.span`
  display: inline-block;
  background: #626262;
  width: 16px;
  height: 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: transform 0.3s ease-in-out;
  position: relative;
  top: 1px;

  &.selected {
    background: #7bc47f !important;
  }

  &.occupied {
    background: #cfcfcf;
  }
`;

const Seat = styled.span`
  display: inline-block;
  background: #626262;
  width: 28px;
  height: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: transform 0.3s ease-in-out;
  position: relative;
  top: 1px;

  &:nth-of-type(8n + 2) {
    margin-right: 12px;
  }

  &:nth-of-type(8n + 6) {
    margin-right: 12px;
  }

  &.selected {
    background: #7bc47f !important;
  }

  &.occupied {
    background: #cfcfcf;
  }

  &:not(.occupied):hover,
  &:not(.occupied):focus {
    cursor: pointer;
    background: #c1eac5;
    transform: scale(1.2);
  }

  &.selected::after {
    content: "";
    position: absolute;
    top: 0;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: transparent;
    border: 1px solid #7bc47f;
    animation: show-off 0.8s;
    visibility: hidden;
  }
`;

const SmallText = styled.small`
  margin-left: 5px;
`;

const Cinema = styled.div`
  margin-bottom: 18px;
  perspective: 400px;

  display: grid;
  place-items: center;
  grid-gap: 24px;
`;

const Screen = styled.div`
  height: 70px;
  background: white;
  width: 55%;
  max-width: 500px;
  transform: rotateX(-20deg) scale(1.1);
  box-shadow: 0 3px 10px 2px;
`;

const SeatsContainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(8, min-content);
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: #f9f9f9;
  margin-top: 15px;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: rgba(200, 200, 200, 0.7);
    color: #f9f9f9;
    border-color: transparent;
  }
`;

export default Booking;
