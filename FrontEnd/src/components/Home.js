import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recomments from "./Recommends";
import NewMovies from "./NewMovies";
import Comingsoon from "./Comingsoons";

import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { useEffect } from "react";
import movieData from "../mockdata/mockData.json";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newMovies = [];
  let commingsoons = [];

  useEffect(() => {
    const movies = movieData.movies;

    recommends = movies.filter((movie) => movie.type === "recommend");
    newMovies = movies.filter((movie) => movie.type === "new");
    commingsoons = movies.filter((movie) => movie.type === "commingsoon");

    console.log(recommends);

    dispatch(
      setMovies({
        recommend: recommends,
        new: newMovies,
        commingsoon: commingsoons,
      })
    );
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recomments />
      <NewMovies />
      <Comingsoon />
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
    background: url("/images/home-background.png") center center/ cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
