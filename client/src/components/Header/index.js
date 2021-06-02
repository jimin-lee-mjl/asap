import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '../../actions/auth';
import { useDispatch } from 'react-redux';

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/mypage">My Page</Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="#"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <IconButton to="/cart">
        <ShoppingCartOutlined />
      </IconButton>
      <Dropdown overlay={menu} placement="bottomRight">
        <IconButton to="/mypage">
          <UserOutlined />
        </IconButton>
      </Dropdown>
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
  border: 0.1rem solid #ff6f00;

  :hover {
    color: #ff6f00;
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
  left: 15vw;
  width: 70vw;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
