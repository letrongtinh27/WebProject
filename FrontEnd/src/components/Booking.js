import styled from "styled-components";
import React, { useEffect } from "react";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieById, getSeatsByShowTime, payment } from "../data/data";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = (props) => {
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(300);
  const navigate = useNavigate();
  // Lấy giá trị từ các tham số truy vấn
  const movieId = sessionStorage.getItem("movieId");
  const showTimeId = sessionStorage.getItem("showTimeId");
  const theatreId = sessionStorage.getItem("theatreId");
  const room = sessionStorage.getItem("room");

  const [booking, setBooking] = useState({
    showTimeId: showTimeId,
    amount: 0,
    price: 0,
    listSeatId: {},
  });

  useEffect(() => {
    let isToastShown = false; // Biến để kiểm tra xem toast đã được hiển thị hay chưa

    const intervalId = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 7 && !isToastShown) {
          // Kiểm tra nếu thời gian đã hết và toast chưa được hiển thị
          // Hiển thị toast
          isToastShown = true; // Đặt biến thành true để ngăn việc hiển thị toast lại

          toast.warning("Đã hết thời gian đặt !", {
            onClose: () => {
              // Xóa interval khi đếm đến 0 và thực hiện các hành động khác
              clearInterval(intervalId);
              sessionStorage.removeItem("movieId");
              sessionStorage.removeItem("showTimeId");
              sessionStorage.removeItem("theatreId");
              sessionStorage.removeItem("room");
              isToastShown = false;
              navigate("/detail/" + movieId); // Chuyển hướng sau khi thời gian hết
            },
          });
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  useEffect(() => {
    getMovieById({ id: movieId })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        setMovie([]);
      });

    getSeatsByShowTime(showTimeId, theatreId, room, token)
      .then((data) => {
        setSeatsData(data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSelectedState(seatId, seatPrice) {
    const isSelected = selectedSeats.includes(seatId);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setPrice(price - seatPrice);
      setAmount(amount - 1);

      setBooking((prevBooking) => ({
        ...prevBooking,
        price: prevBooking.price - seatPrice,
        amount: prevBooking.amount - 1,
        listSeatId: selectedSeats.filter((id) => id !== seatId),
      }));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setPrice(price + seatPrice);
      setAmount(amount + 1);

      setBooking((prevBooking) => ({
        ...prevBooking,
        price: prevBooking.price + seatPrice,
        amount: prevBooking.amount + 1,
        listSeatId: [...selectedSeats, seatId],
      }));
    }
  }

  function validatePayment() {
    if (booking.amount !== 0 && booking.price !== 0) {
      return true;
    }
    return false;
  }

  function paymentHandle() {
    if (validatePayment()) {
      setLoading(true);
      payment(booking, token)
        .then((data) => {
          console.log(data.code);
          if (data.code === 200) {
            setLoading(false);
            window.location = data.urlPayment;
          }
          if (data.code === 400) {
            setLoading(false);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error("Đặt ghế không thành công!");
          console.error(error);
        });
    }
  }

  return (
    <Container>
      <ToastContainer />
      <Book>
        <Left>
          <img src={movie.poster_url} alt="" />
          <Infor>
            <h3>Thời gian đặt vé</h3>
            <p>{timeRemaining} giây</p>
            <h3>Số lượng vé</h3>
            <p>{booking.amount} vé</p>
            <h3>Giá tiền</h3>
            <p>
              {booking.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
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
            <SeatListItem>
              <SeatBaner className="seat damaged" />{" "}
              <SmallText>Ghế hỏng</SmallText>
            </SeatListItem>
          </ShowCase>

          <Cinema>
            <Screen />
            <SeatsContainer>
              {seatsData.map(({ id, seatNumber, price, booked, status }) => {
                const isSelected = selectedSeats.includes(id);
                return (
                  <Seat
                    key={id}
                    tabIndex="0"
                    className={clsx(
                      "seat",
                      isSelected && "selected",
                      booked && "occupied",
                      status && "damaged"
                    )}
                    onClick={
                      !booked ? () => handleSelectedState(id, price) : null
                    }
                  >
                    {seatNumber}
                  </Seat>
                );
              })}
            </SeatsContainer>
            <Infor2>
              <h3>Thời gian đặt vé</h3>
              <p>{timeRemaining} giây</p>
              <h3>Số lượng vé</h3>
              <p>{booking.amount} vé</p>
              <h3>Giá tiền</h3>
              <p>
                {booking.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </Infor2>
            <SubmitButton onClick={paymentHandle} disabled={loading}>
              {loading ? (
                <ReactLoading
                  type="spin"
                  color={"#000"}
                  width={"25px"}
                  // height={"50px"}
                />
              ) : (
                "Xác nhận"
              )}
            </SubmitButton>
          </Cinema>
        </Right>
      </Book>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  top: 15px;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

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

const Book = styled.div`
  width: 65%;
  height: 75%;
  display: flex;
  max-height: 540px;
  min-height: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Left = styled.div`
  position: relative;
  width: 20%;
  height: 100%;
  border: 1px solid #fff;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  width: 80%;
  position: relative;
  height: 100%;
  border: 1px solid #fff;
  padding: 10px 40px;
  background: unset;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Infor = styled.div`
  color: #fff;
  padding: 0 20px;
  h3,
  p {
    margin: 5px 0px;
  }
`;

const Infor2 = styled.div`
  color: #fff;
  display: none;
  width: 120%;
  h3,
  p {
    margin: 5px 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
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

  &.damaged {
    background: #e63946;
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

  &.damaged {
    background: #e63946;
  }

  &:not(.occupied):hover,
  &:not(.occupied):focus {
    cursor: pointer;
    background: #c1eac5;
    transform: scale(1.2);
  }

  &.selected::after,
  &.damaged::after {
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
  height: 45px;
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
