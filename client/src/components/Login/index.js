import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import axios from 'axios';
import { login } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const login = async (email, password) => {
  //   const response = await axios
  //     .post('https://fakestoreapi.com/auth/login', {
  //       username: email,
  //       password: password,
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log(response);
  // };

  const handleClick = () => {
    try {
      dispatch(login(email, password));
    } catch (e) {
      alert('Failed to login');
      setEmail('');
      setPassword('');
    }
    // console.log(state);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Container>
        <h1 style={{ textAlign: 'center', margin: '0 0 20px' }}>Login</h1>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 40px',
            textAlign: 'left',
          }}
        >
          <FormControl>
            <label>Name</label>
            <input
              type="test"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
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
        </form>
        <Link to="/register">Create Account</Link>
      </Container>
    </div>
  );
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  width: 400px;
  min-height: 450px;
  border-radius: 0.6em;
  padding: 20px;
  background-color: white;
  box-shadow: 20px 20px 60px #97a1a1, -20px -20px 60px #ffffff;
  margin: 20px auto;
  text-align: center;

  @media only screen and (max-width: 600px) {
    background-color: ivory;
    box-shadow: none;
  }
`;

const FormControl = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  position: relative;

  label {
    color: #33032d;
    display: block;
    margin-bottom: 5px;
  }

  input {
    border-radius: 6px;
    min-height: 2.618em;
    border: gray solid 2px;
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
  padding: 7px;
  border-radius: 0.6em;
  border: solid white 2px;
  margin-top: 10px;

  :hover {
    color: black;
    background: white;
    border: solid black 2px;
  }
`;
