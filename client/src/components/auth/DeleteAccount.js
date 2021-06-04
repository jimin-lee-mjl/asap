import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../actions/auth';
import styled from 'styled-components';
import Header from '../Header';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Form onSubmit={onSubmitHandler}>
          <Logo
            src="logo-circle.png"
            alt="logo"
            onClick={() => {
              history.push('/');
            }}
          />
          <h1 style={{ textAlign: 'center', margin: '0 0 2rem' }}>
            Are you sure delete your account?
          </h1>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Button onClick={onSubmitHandler}>Yes</Button>
            <Button onClick={onSubmitHandler}>No</Button>
          </div>
        </Form>

        <Link to="/login" style={{ color: '#fb8c00' }}>
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
  width: 40%;

  :hover {
    color: black;
    background: white;
  }
`;
