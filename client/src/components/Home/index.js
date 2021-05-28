import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  let history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        // background: "#F3EAD9"
        // background: 'ivory',
      }}
    >
      <Logo>ASAP</Logo>
      <Photo></Photo>
      <div
        style={{
          display: 'flex',
          position: 'absoulte',
          zIndex: '5000',
          marginBottom: '100px',
          alignItems: 'space-between',
        }}
      >
        <Button
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            history.push('/info');
          }}
        >
          Guest
        </Button>
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

const Logo = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 0.1rem;
  position: absolute;
  top: 12%;
  z-index: 10;

  @media only screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Button = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
  background: black;
  width: 120px;
  height: 50px;
  font-size: 1.3rem;
  color: white;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;

  :hover {
    color: black;
    background: white;
    border: solid black 2px;
  }
`;
