import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../Header';
import axios from 'axios';
import { userinfo } from '../../actions/mypage';
import baseUrl from '../../url';
import { useSelector } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const getUser = () => {
    const token = localStorage.getItem('token');
    console.log('at mypage token', token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(baseUrl + '/api/user/', config)
      .then((res) => {
        console.log('GET USER INFO', res.data);
        dispatch(userinfo(res.data));
      })
      .catch((err) => console.log(err.response));
  };

  const handleClick = () => {
    try {
      dispatch(login(id, password));
      getUser();
    } catch (e) {
      alert('Failed to login');
      setId('');
      setPassword('');
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container>
        <Header type="guest" />
        <Wrapper>
          <Form>
            {/* <h1 style={{ textAlign: 'center', margin: '0 0 2rem' }}>Login</h1> */}
            <Logo
              src="logo-circle.png"
              alt="logo"
              onClick={() => {
                history.push('/');
              }}
            />
            <FormControl>
              <label>ID</label>
              <input
                type="test"
                value={id}
                onChange={({ target: { value } }) => setId(value)}
              />
            </FormControl>
            <FormControl>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </FormControl>
            <Button type="primary" htmlType="submit" onClick={handleClick}>
              Login
            </Button>
          </Form>
          <Link to="/register" style={{ color: '#fb8c00' }}>
            Create Account
          </Link>
        </Wrapper>
      </Container>
    );
  }
}
const Container = styled.div`
  flex: 1;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
const Logo = styled.img`
  width: 15rem;
  height: 15rem;
  margin: 3rem auto;
  cursor: pointer;
  :hover {
    filter: drop-shadow(2px 4px 8px #ffb300);
  }
`;
const Wrapper = styled.div`
  width: 40rem;
  min-height: 45rem;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: white;
  box-shadow: 2rem 2rem 6rem #97a1a1, -2rem -2rem 6rem #ffffff;
  margin: 2rem auto;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  text-align: left;
`;
const FormControl = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  position: relative;
  label {
    color: #33032d;
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    border-radius: 0.5rem;
    min-height: 2.618em;
    border: gray solid 0.2rem;
    display: block;
    width: 100%;
    font-size: 14px;
    padding: 7px;
  }
`;
const Button = styled.div`
  background: black;
  color: white;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  border: solid black 0.2rem;
  margin-top: 1rem;
  :hover {
    color: black;
    background: white;
  }
`;
