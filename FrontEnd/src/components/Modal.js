import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import { getAllTheatre, getShowsByMovieIdAndTheatreId } from "../data/data";

const Modal = ({ $isOpen, toggleModal }) => {
  const { id } = useParams();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedShow, setSelectedShow] = useState();

  const [selectedTimeButton, setSelectedTimeButton] = useState(null);
  const [selectedDayButton, setSelectedDayButton] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);

  const handleTheatreChange = (selectOption) => {
    setSelectedTheatre(selectOption.value);
  };

  const getAllTheatres = () => {
    getAllTheatre()
      .then((data) => {
        setTheatres(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getShowsByMovieIdAndTheatreId(id, selectedTheatre)
      .then((data) => {
        // Lọc ra những show có ngày trùng khớp với ngày người dùng chọn
        const filteredShows = data.filter((show) => show.date === selectedDay);
        // Cập nhật state shows với danh sách show đã lọc
        setShows(filteredShows);
      })
      .catch((error) => {
        setShows([]);
      });
  }, [selectedDay, selectedTime, selectedTheatre]);

  useEffect(() => {
    getAllTheatres();
  }, []);

  const theatreOptions = theatres.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const handleDayChange = (event) => {
    const selectedDayValue = event.target.value;
    setSelectedDay(selectedDayValue);
    setSelectedDayButton(selectedDayValue);
  };

  const handleTimeChange = (event) => {
    const selectedTimeValue = event.target.value;
    setSelectedTime(selectedTimeValue);
    setSelectedTimeButton(selectedTimeValue);
    setSelectedShow(event.target.dataset.datashow);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200, // Độ rộng của Select được đặt trực tiếp ở đây
    }),
  };

  let currentDate = new Date();

  let datesArray = [];

  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(currentDate);

    nextDate.setDate(currentDate.getDate() + i);

    let day = nextDate.getDate();
    let month = nextDate.getMonth() + 1;

    let formattedDate = `${day}/${month}`;

    datesArray.push(formattedDate);
  }

  return (
    <ModalWrapper $isOpen={$isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={toggleModal}>&times;</ModalCloseButton>
        <Location>
          <h2>Select location</h2>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            isLoading={false}
            isRtl={false}
            isSearchable={true}
            name="theatre"
            options={theatreOptions}
            onChange={handleTheatreChange}
          />
        </Location>
        <h2>Select Date and Time</h2>
        <div>
          <h3 style={{ color: "white", margin: "5px" }}>Choose Date:</h3>
          <ContainerDay>
            {datesArray.map((day) => (
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
            ))}
          </ContainerDay>
        </div>
        <div>
          <h3 style={{ color: "white", margin: "5px" }}>Choose Time:</h3>
          <ContainerTime>
            {shows.map((show) => (
              <TimeButton
                key={show.id}
                htmlFor={show.start_time}
                $isSelected={selectedTimeButton === show.start_time}
              >
                {show.start_time}
                <input
                  type="radio"
                  name="time"
                  data-datashow={show.id}
                  id={show.start_time}
                  value={show.start_time}
                  onChange={handleTimeChange}
                />
              </TimeButton>
            ))}
          </ContainerTime>
        </div>
        <SubmitContainer>
          <SubmitButton href={"/booking/?showId=" + selectedShow}>
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
  background-color: rgba(0, 0, 0, 0.7);
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

const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 550px;
  min-width: 250px;
  be
`;

export default Modal;
