import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function UserInfo() {
  const history = useHistory();

  const user = {
    id: 'asap2021',
    email: 'elice@elice.com',
    password: '123456',
  };

  return (
    <Container>
      <h1>User Info</h1>
      <form style={{ width: '70%' }}>
        <FormControl>
          <label>Id</label>
          <input type="text" value={user.id}></input>
        </FormControl>
        <FormControl>
          <label>Email</label>
          <input type="email" value={user.email}></input>
        </FormControl>
        <FormControl>
          <label>Password</label>
          <input type="password" value={user.password}></input>
        </FormControl>
      </form>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Button
          onClick={() => history.push('/changepassword')}
          style={{ margin: '0 1rem' }}
        >
          Change Password
        </Button>
        <Button
          onClick={() => history.push('/deleteaccount')}
          style={{ margin: '0 0.5rem' }}
        >
          Delete Account
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem #ff6f00;
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  grid-area: userInfo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const FormControl = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  position: relative;

  label {
    color: #33032d;
    display: block;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  input {
    border-radius: 0.5rem;
    border: gray solid 0.2rem;
    display: block;
    width: 100%;
    font-size: 14px;
    padding: 7px;
  }
`;

const Button = styled.button`
  background: #ff6f00;
  margin: 0 1rem;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  :hover {
    box-shadow: 2px 4px 8px #ffb300;
  }
`;
