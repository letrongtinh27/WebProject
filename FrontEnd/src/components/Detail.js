import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { getMovieById } from "../data/data";
import { ToastContainer, toast } from "react-toastify";

const Detail = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleTrailer = () => {
    window.open(movie.trailer_video_url, "_blank");
  };

  const getMovie = () => {
    getMovieById({ id: id })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const formatSubTitle = (subTitle) => {
    // Kiểm tra nếu subTitle không phải là undefined hoặc null
    if (subTitle) {
      // Thêm <br> trước mỗi dấu ":" và sau các mục cần xuống dòng
      return subTitle
        .replace(
          /(Đạo diễn:|Diễn viên:|Thể loại:|Khởi chiếu:|Thời lượng:|Ngôn ngữ:)/g,
          "<br>$1"
        )
        .replace(/^(<br>)+/, ""); // Loại bỏ thẻ <br> ở đầu chuỗi
    }
    return "";
  };

  useEffect(() => {
    getMovie();
  }, [id]);
  return (
    <Container>
      <ToastContainer />
      <Background>
        {movie.background_img_url !== "" ? (
          <img src={movie.background_img_url} alt=""></img>
        ) : (
          <img
            src={movie.poster_url}
            alt=""
            style={{
              width: "auto",
              height: "auto",
              "background-size": "cover",
              objectFit: "cover",
            }}
          ></img>
        )}
      </Background>
      <ImageTitle>
        <img src={movie.title_img_url} alt="" />
      </ImageTitle>
      <ContenMeta>
        <Modal $isOpen={isModalOpen} toggleModal={toggleModal}></Modal>
        <Controls>
          {movie.type === "commingsoon" ? (
            <Player>
              <img src="/images/ticket-solid.svg" alt="" />

              <span>Chưa mở bán vé</span>
            </Player>
          ) : (
            <Player onClick={toggleModal}>
              <img src="/images/ticket-solid.svg" alt="" />
              <span>Mua vé</span>
            </Player>
          )}
          <Trailer onClick={toggleTrailer}>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Xem Trailer</span>
          </Trailer>
          <AddList>
            <span></span>
            <span></span>
          </AddList>
        </Controls>
        <SubTitle
          dangerouslySetInnerHTML={{ __html: formatSubTitle(movie.sub_title) }}
        />
        <Description>{movie.description}</Description>
      </ContenMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContenMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 54px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (min-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  text-align: left;
  font-size: 15px;
  white-space: pre-line;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  text-align: left;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
