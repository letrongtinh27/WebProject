import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTheatre } from "../data/data.js";
import images from "../data/images.js";
import Viewers from "./Viewers.js";
import { AccountTitle } from "./Account.js";
import ImgSlider from "./ImgSlider.js";

const Theatre = (props) => {
  const [theatre_HCM, setTheatreHCM] = useState([]);
  const [theatre_HN, setTheatreHN] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const theatres = await getAllTheatre();

        const theatreHCM = theatres.filter(
          (theatre) => theatre.location.name === "Hồ Chí Minh"
        );
        setTheatreHCM(theatreHCM);
        const theatreHN = theatres.filter(
          (theatre) => theatre.location.name === "Hà Nội"
        );
        setTheatreHN(theatreHN);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container backgroundImage={images.homeBackground}>
      {/* <ImgSlider />
      <Viewers /> */}
      <AccountTitle>
        <h1>Hệ Thống Rạp</h1>
      </AccountTitle>
      <TheatreCard>
        <h4>Thành phố Hồ Chí Minh</h4>
        <Content>
          {theatre_HCM &&
            theatre_HCM.map((theatre, key) => (
              <Wrap key={key}>
                <Link to={`/theatreDetail/` + theatre.id}>
                  <img src={theatre.image} alt={theatre.name}></img>
                  <span>{theatre.name}</span>
                </Link>
              </Wrap>
            ))}
        </Content>
      </TheatreCard>
      <TheatreCard>
        <h4>Hà Nội</h4>
        <Content>
          {theatre_HN &&
            theatre_HN.map((theatre, key) => (
              <Wrap key={key}>
                <Link to={`/theatreDetail/` + theatre.id}>
                  <img src={theatre.image} alt={theatre.name}></img>
                  <span>{theatre.name}</span>
                </Link>
              </Wrap>
            ))}
        </Content>
      </TheatreCard>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url(${(props) => props.backgroundImage}) center center/ cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const TheatreCard = styled.div`
  padding: 0 0 26px;

  h4 {
    color: #f9f9f9;
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 90%;
    object-fit: scale-down;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
    @media (max-width: 768px) {
      height: 85%;
    }
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Theatre;
