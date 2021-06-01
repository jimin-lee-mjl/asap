import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <Container>
      <Header>
        <IconButton to="/cart">
          <ShoppingCartOutlined />
        </IconButton>

        <IconButton to="/mypage">
          <UserOutlined />
        </IconButton>
      </Header>
      <img src="/logo-circle.png" alt="logo" style={{ zIndex: 2 }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10vh',
          zIndex: 2,
        }}
      >
        <Button to="/login">Login</Button>
        <Button to="/info">Guest</Button>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 80vw;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('calhartt.png') center;
`;

const Button = styled(Link)`
  background: #fb8c00;
  width: 12rem;
  height: 5rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  color: black;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;
  margin: 5px 0;

  :hover {
    color: #fb8c00;
    background: white;
  }
`;

const IconButton = styled(Button)`
  width: 5rem;
  height: 5rem;
  font-size: '300%';
  color: 'black';
  margin: 0 0.5rem;
  background: '#fb8c00';
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 80vw;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
