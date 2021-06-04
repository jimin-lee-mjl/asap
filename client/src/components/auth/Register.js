import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../actions/auth';
import styled from 'styled-components';
import Header from '../Header';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [id, setId] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setConfirmPasword] = useState('');
  const [email, setEmail] = useState('');

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrftoken = getCookie('csrftoken');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ id, email, password1, password2 }));
    // history.push('/login');

    fetch(
      'http://elice-kdt-ai-track-vm-ai-22.koreacentral.cloudapp.azure.com/rest-auth/registration/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ username: id, email, password1, password2 }),
      },
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <Container>
      <Header type="guest" />
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
            <label>ID</label>
            <input type="text" value={id} onChange={onIdHandler} />
          </FormControl>

          <FormControl>
            <label>Email</label>
            <input type="email" value={email} onChange={onEmailHandler} />
          </FormControl>

          <FormControl>
            <label>Password</label>
            <input
              type="password"
              value={password1}
              onChange={onPasswordHanlder}
            />
          </FormControl>

          <FormControl>
            <label>Confirm Pasword</label>
            <input
              type="password"
              value={password2}
              onChange={onConfirmPasswordHandler}
            />
          </FormControl>

          <Button onClick={onSubmitHandler}>Create Account</Button>
        </Form>

        <Link to="/login" style={{ color: '#fb8c00' }}>
          Go to Login
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
