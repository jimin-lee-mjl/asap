import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
  return (
    <Header>
      <IconButton to="/cart">
        <ShoppingCartOutlined />
      </IconButton>
      <IconButton to="/login">
        <UserOutlined />
      </IconButton>
    </Header>
  );
};

export default HeaderComponent;

const Button = styled(Link)`
  background: #ff6f00;
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
    box-shadow: 2px 4px 8px #ffb300;
    color: white;
  }
`;

const IconButton = styled(Button)`
  width: 4rem;
  height: 4rem;
  font-size: '300%';
  color: 'black';
  margin: 0 0.5rem;
  background: '#fb8c00';
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 15vw;
  width: 70vw;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
