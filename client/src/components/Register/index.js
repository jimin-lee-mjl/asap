import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import styled from 'styled-components';

function RegisterPage(props) {
  const [username, setName] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setConfirmPasword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
    console.log(username);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(username, email, password1, password2);
    dispatch(register({ username, email, password1, password2 }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Container>
        <form
          onSubmit={onSubmitHandler}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 40px',
          }}
        >
          <h1 style={{ textAlign: 'center', margin: '0 0 20px' }}>
            Create Account
          </h1>

          <FormControl>
            <label>Name</label>
            <input type="test" value={username} onChange={onNameHandler} />
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

          <FormControl>
            <label>Email (선택)</label>
            <input type="email" value={email} onChange={onEmailHandler} />
            <br />
          </FormControl>

          <Button type="submit">회원 가입</Button>
        </form>
      </Container>
    </div>
  );
}

export default withRouter(RegisterPage);

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  width: 400px;
  border-radius: 0.6em;
  padding: 20px;
  background-color: white;
  box-shadow: 20px 20px 60px #97a1a1, -20px -20px 60px #ffffff;
  margin: 20px auto;
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

  :hover {
    color: black;
    background: white;
    border: solid black 2px;
  }
`;
