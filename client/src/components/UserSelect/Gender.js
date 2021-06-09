import React from 'react';
import { useDispatch } from 'react-redux';
import { selectGender } from '../../actions/userSelect';
import styled from 'styled-components';

export default function Gender() {
  const dispatch = useDispatch();

  return (
    <>
      <h1>Choose your gender!</h1>
      <Container>
        <input
          id="men"
          type="radio"
          name="gender"
          onClick={() => {
            dispatch(selectGender('men'));
          }}
        />
        <Item for="men" style={{ backgroundImage: `url('/shopMen.png')` }}>
          <span>Men</span>
        </Item>
        <input
          id="women"
          type="radio"
          name="gender"
          onClick={() => {
            dispatch(selectGender('women'));
          }}
        />
        <Item for="women" style={{ backgroundImage: `url('/shopWomens.jpg')` }}>
          <span>Women</span>
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

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input:checked + label {
    filter: grayscale(0);
  }
`;

const Item = styled.label`
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

  span {
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
