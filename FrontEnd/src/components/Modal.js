import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Modal = ({ $isOpen, toggleModal }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeButton, setSelectedTimeButton] = useState(null);
  const [selectedDayButton, setSelectedDayButton] = useState(null);

  useEffect(() => {
    console.log("Selected day:", selectedDay);
    console.log("Selected time:", selectedTime);
  }, [selectedTime, selectedDay]);

  const handleDayChange = (event) => {
    const selectedDayValue = event.target.value;
    setSelectedDay(selectedDayValue);
    setSelectedDayButton(selectedDayValue);
  };

  const handleTimeChange = (event) => {
    const selectedTimeValue = event.target.value;
    setSelectedTime(selectedTimeValue);
    setSelectedTimeButton(selectedTimeValue);
  };

  return (
    <ModalWrapper $isOpen={$isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={toggleModal}>&times;</ModalCloseButton>
        <h2>Select Date and Time</h2>
        <div>
          <h3>Choose Date:</h3>
          <ContainerDay>
            {["25/3", "26/3", "27/3", "28/3", "29/3", "30/3", "31/3"].map(
              (day) => (
                <DayButton
                  key={day}
                  $isSelected={selectedDayButton === day}
                  htmlFor={day}
                >
                  <input
                    type="radio"
                    name="day"
                    id={day}
                    value={day}
                    onChange={handleDayChange}
                  />
                  {day}
                </DayButton>
              )
            )}
          </ContainerDay>
        </div>
        <div>
          <h3>Choose Time:</h3>
          <ContainerTime>
            {[
              "10:00 AM",
              "11:00 AM",
              "12:00 AM",
              "13:00 AM",
              "1:00 PM",
              "2:00 PM",
              "3:00 PM",
              "4:00 PM",

              ,
            ].map((time) => (
              <TimeButton
                key={time}
                htmlFor={time}
                $isSelected={selectedTimeButton === time}
              >
                {time}
                <input
                  type="radio"
                  name="time"
                  id={time}
                  value={time}
                  onChange={handleTimeChange}
                />
              </TimeButton>
            ))}
          </ContainerTime>
        </div>
        <SubmitContainer>
          <SubmitButton href={"booking/" + selectedDay + "/" + selectedTime}>
            Xác nhận
          </SubmitButton>
        </SubmitContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #1f2025;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%;
  min-width: 420px;
  max-width: 600px;
`;

const ModalCloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const ContainerTime = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const TimeButton = styled.label`
  background-color: ${(props) =>
    props.$isSelected ? "#f9f9f9" : "rgba(0, 0, 0, 0.2)"};
  color: ${(props) => (props.$isSelected ? "rgba(0, 0, 0, 0.6)" : "#f9f9f9")};
  padding: 8px 16px;
  margin: 5px 5px;
  width: 25%;
  min-width: 50px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    background-color: #f9f9f9;
    color: rgba(0, 0, 0, 0.6);
    border-color: transparent;
    label {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const ContainerDay = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const DayButton = styled.label`
  background-color: ${(props) =>
    props.$isSelected ? "#f9f9f9" : "rgba(0, 0, 0, 0.2)"};
  color: ${(props) => (props.$isSelected ? "rgba(0, 0, 0, 0.6)" : "#f9f9f9")};
  padding: 4px 8px;
  margin: 2.5px 2.5px;
  width: 15%;
  max-width: 100px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    background-color: #f9f9f9;
    color: rgba(0, 0, 0, 0.6);
    border-color: transparent;
    label {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  margin-top: 15px;
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

export default Modal;
