import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  let history = useHistory();

  return (
    <Container>
      {isAuthenticated ? <Header /> : <Header type="guest" />}
      <Logo src="/logo-circle.png" alt="logo" style={{ zIndex: 2 }} />
      <div
        style={{
          display: 'flex',
          position: 'absoulte',
          zIndex: '5000',
          marginBottom: '100px',
          alignItems: 'space-between',
        }}
      >
        {isAuthenticated ? (
          <Button to="/select">Start</Button>
        ) : (
          <>
            <Button to="/login">Login</Button>
            <Button to="/select">Guest</Button>
          </>
        )}
      </div>
    </div>
  );
}

const Photo = styled.div`
  height: 80%;
  width: 80%;
  background-size: cover;
  background-image: url('bg9.png');
  background-position: center;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Container = styled.div`
  flex: 1;
  width: 75vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('/calhartt.png') center;
`;

const Logo = styled.img`
  z-index: 2;

  :hover {
    filter: drop-shadow(2px 4px 8px #ffb300);
  }
`;

const Button = styled(Link)`
  background: #ff6f00;
  width: 10rem;
  height: 4rem;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  color: black;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;

  :hover {
    color: white;
    box-shadow: 2px 4px 8px #ffb300;
  }
`;
