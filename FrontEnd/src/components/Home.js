import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Newreleases from "./Newreleases.js";
import NewMovies from "./NewMovies";
import Comingsoon from "./Comingsoons";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import { useEffect } from "react";
import { getAllMovie } from "../data/data.js";
import images from "../data/images.js";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesFromApi = await getAllMovie();

        const newreleases = moviesFromApi.filter(
          (movie) => movie.type === "newreleases"
        );
        const newMovies = moviesFromApi.filter((movie) => movie.type === "new");
        const commingsoons = moviesFromApi.filter(
          (movie) => movie.type === "commingsoon"
        );

        dispatch(
          setMovies({
            newreleases: newreleases,
            new: newMovies,
            commingsoon: commingsoons,
          })
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container backgroundImage={images.homeBackground}>
      <ImgSlider />
      <Viewers />
      <Newreleases />
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
    background: url(${(props) => props.backgroundImage}) center center/ cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
