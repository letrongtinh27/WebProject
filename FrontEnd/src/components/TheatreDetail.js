import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { geocode, getTheatreById } from "../data/data";
import images from "../data/images";

const TheatreDetail = (props) => {
  const [position, setPosition] = useState(null);
  const [theatre, setTheatre] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getTheatreById({ id: id })
      .then((data) => {
        setTheatre(data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(theatre.address);

    const fetchCoordinates = async () => {
      const coordinates = await geocode(theatre.address);
      setPosition(coordinates);
    };
    fetchCoordinates();
    console.log(position);
  }, [id]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <Container>
      <TheatreTitle>
        <h1>Hệ Thống Rạp</h1>
      </TheatreTitle>
      <TheatreContainer>
        <TheatreContent>
          <h1>{theatre.name}</h1>
          <ul>
            <li>Địa điểm: {theatre.address}</li>
            <li>Số điện thoại: 1900 2099 hoặc {theatre.phone_number}</li>
            <li>Email: {theatre.email}</li>
            <li>Phòng chiếu: {theatre.description}</li>
          </ul>
          <img src={images.priceBoard}></img>
          <h1>CÁC QUY ĐỊNH GIÁ VÉ</h1>
          <ul>
            <li>
              Giá vé trẻ em áp dụng cho trẻ em có chiều cao dưới 1,3m. Yêu cầu
              trẻ em có mặt khi mua vé. Trẻ em dưới 0,7m sẽ được miễn phí vé khi
              mua cùng 01 vé người lớn đi kèm theo. Không áp dụng kèm với chương
              trình khuyến mãi ưu đãi về giá vé khác.
            </li>
            <li>
              Giá vé thành viên U22 chỉ áp dụng cho thành viên dưới 22 tuổi khi
              mua vé. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về
              giá vé khác. Mỗi thẻ thành viên U22 được áp dụng giá vé ưu đãi tối
              đa 02 vé/ngày.
            </li>
            <li>
              Ngày lễ: 1/1, Giổ Tổ Hùng Vương 10/3 Âm Lịch, 30/4, 1/5, 02 ngày
              Lễ Quốc Khánh
            </li>
            <li>Giá vé Tết Âm Lịch sẽ được áp dụng riêng.</li>
            <li>
              Suất chiếu đặc biệt áp dụng giá vé theo khung giờ của ngày. Không
              áp dụng các giá vé ưu đãi dành cho U22, Privilege Voucher/Staff
              Voucher, Happy Day. Trong trường hợp Suất chiếu đặc biệt cùng ngày
              với Happy Day sẽ áp dụng giá vé của Thứ 3
            </li>
          </ul>
          <Map>
            <LoadScript googleMapsApiKey="AIzaSyBA-wMiHOMAOZuB8ngN1xv0p-9dViRnVeA">
              {position && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={position}
                  zoom={20}
                >
                  <Marker position={position} />
                </GoogleMap>
              )}
            </LoadScript>
          </Map>
        </TheatreContent>
      </TheatreContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 250px);
  height: auto;
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

const TheatreTitle = styled.div`
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

const TheatreContainer = styled.main`
  position: relative;
  display: block;
`;

const TheatreContent = styled.div`
  max-width: 1100px;
  min-width: 390px;
  height: auto;
  border: 1px solid #454d6a;
  border-radius: 5px;
  margin: 0 auto;
  text-align: left;
  padding: 0 20px 0 20px;
  color: #fff;

  ul {
    margin-bottom: 1.3rem;
    list-style: disc;
    margin-top: 0;
    margin-left: 20px;
    padding: 0;

    li {
      margin-top: 10px;
    }
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const Map = styled.div`
  margin-bottom: 25px;
`;

export default TheatreDetail;
