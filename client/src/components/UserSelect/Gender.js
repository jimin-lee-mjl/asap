import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Gender() {
  return (
    <>
      <h1>Choose your gender!</h1>
      <Container>
        <Item style={{ backgroundImage: `url('/shopMen.png')` }}>
          <Link>Men</Link>
        </Item>
        <Item style={{ backgroundImage: `url('/shopWomens.jpg')` }}>
          <Link>Women</Link>
        </Item>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Item = styled.div`
  position: relative;
  width: 40%;
  height: 90%;
  margin: 0 1rem;
  float: left;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 1rem;
  filter: grayscale(1);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: grayscale(0);
  }

  a {
    -webkit-text-decoration: none;
    text-decoration: none;
    /* background: rgba(255, 255, 255, 0.3); */
    /* width: auto;
    height: 3rem; */
    padding: 0.5rem;
    font-size: 3rem;
    font-weight: 900;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
  }
`;
