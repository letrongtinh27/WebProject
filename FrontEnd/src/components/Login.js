import styled from "styled-components";
import LoginForm from "./LoginForm";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <Bigimage />
        <LoginForm />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  color: #f9f9f9;
  margin-botton: 10wh;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-item: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const Bigimage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/bg2.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;
export default Login;
