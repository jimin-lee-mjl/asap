import React from 'react';
import styled from 'styled-components';

export default function UserInfo() {
  const user = {
    email: 'elice@elice.com',
    password: '123456',
  };

  return (
    <Container>
      <h1>User Info</h1>
      <form style={{ width: '70%' }}>
        <FormControl>
          <label>email</label>
          <input type="email" value={user.email}></input>
        </FormControl>
        <FormControl>
          <label>password</label>
          <input type="password" value={user.password}></input>
        </FormControl>
      </form>
      <div>
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
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
