import styled from "styled-components";
import React from "react";
import clsx from "clsx";
import { useState } from "react";

const movies = [
  {
    name: "Avenger",
    price: 10,
    occupied: [20, 21, 30, 1, 2, 8],
  },
  {
    name: "Joker",
    price: 12,
    occupied: [9, 41, 35, 11, 65, 26],
  },
  {
    name: "Toy story",
    price: 8,
    occupied: [37, 25, 44, 13, 2, 3],
  },
  {
    name: "the lion king",
    price: 9,
    occupied: [10, 12, 50, 33, 28, 47],
  },
];

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

const Booking = (props) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      setSelectedSeats((selectedSeats) =>
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
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
            <h3>Công chiếu</h3>
            <p>6 tháng 2 năm 2024</p>
          </Infor>
        </Left>
        <Right>
          <ShowCase>
            <SeatListItem>
              <SeatBaner className="seat" /> <SmallText>N/A</SmallText>
            </SeatListItem>
            <SeatListItem>
              <SeatBaner className="seat selected" />{" "}
              <SmallText>Selected</SmallText>
            </SeatListItem>
            <SeatListItem>
              <SeatBaner className="seat occupied" />{" "}
              <SmallText>Occupied</SmallText>
            </SeatListItem>
          </ShowCase>

          <Cinema>
            <Screen />
            <SeatsContainer>
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat);
                const isOccupied = movies[0].occupied.includes(seat);
                return (
                  <Seat
                    cinema
                    tabIndex="0"
                    key={seat}
                    className={clsx(
                      "seat",
                      isSelected && "selected",
                      isOccupied && "occupied"
                    )}
                    onClick={
                      isOccupied ? null : () => handleSelectedState(seat)
                    }
                  ></Seat>
                );
              })}
            </SeatsContainer>
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
  width: 16px;
  height: 12px;
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
  max-width: 250px;
  transform: rotateX(-20deg) scale(1.1);
  box-shadow: 0 3px 10px 2px;
`;

const SeatsContainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(8, min-content);
  align-items: center;
`;

export default Booking;
