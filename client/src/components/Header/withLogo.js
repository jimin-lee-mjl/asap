import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
  const history = useHistory();

  return (
    <Container>
      <LogoWrapper>
        <Logo
          src="logo-circle.png"
          alt="logo"
          onClick={() => {
            history.push('/');
          }}
        />
      </LogoWrapper>

      <Header>
        <IconButton to="/cart">
          <ShoppingCartOutlined />
        </IconButton>
        <IconButton to="/mypage">
          <UserOutlined />
        </IconButton>
      </Header>
    </Container>
  );
};

export default HeaderComponent;

const Container = styled.div`
  width: 100%;
  height: 18rem;
  position: absolute;
  top: 0;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: absolute;
  top: 0;
`;

const Logo = styled.img`
  /* position: absolute; */
  width: 15rem;
  /* top: 0px; */
  margin: 2rem 0px;
  cursor: pointer;
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
