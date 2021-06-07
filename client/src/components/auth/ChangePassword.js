import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../actions/auth';
import styled from 'styled-components';
import Header from '../Header';
import baseUrl from '../../url';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [old, setOld] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setConfirmPasword] = useState('');

  const onOldHandler = (e) => {
    setOld(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(old, password1, password2);
    changePassword();
    history.push('/login');
  };

  const changePassword = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const body = {
      old_password: old,
      new_password1: password1,
      new_password2: password2,
    };
    axios
      .post(baseUrl + '/rest-auth/password/change/', body, config)
      .then((res) => {
        console.log('change password SUCCESSED', res);
        alert('Your password successfully changed.');
      })
      .catch((err) => {
        console.log(err.response);
        alert('Update failed. Please try again.');
      });
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          {/* <h1 style={{ textAlign: 'center', margin: '0 0 2rem' }}>
            Create Account
          </h1> */}
          <Logo
            src="logo-circle.png"
            alt="logo"
            onClick={() => {
              history.push('/');
            }}
          />

          <FormControl>
            <label>Current Password</label>
            <input type="password" value={old} onChange={onOldHandler} />
          </FormControl>

          <FormControl>
            <label>New Password</label>
            <input
              type="password"
              value={password1}
              onChange={onPasswordHanlder}
            />
          </FormControl>

          <FormControl>
            <label>Confirm New Pasword</label>
            <input
              type="password"
              value={password2}
              onChange={onConfirmPasswordHandler}
            />
          </FormControl>

          <Button onClick={onSubmitHandler}>Change Password</Button>
        </Form>
        <Link to="/mypage" style={{ color: '#fb8c00' }}>
          Back to My Page
        </Link>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
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
