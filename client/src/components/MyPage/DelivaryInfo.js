import React, { useState } from 'react';
import styled from 'styled-components';

export default function DeliveryInfo() {
  const [delivery, setDelivery] = useState({
    firstName: 'Harry',
    lastName: 'Potter',
    address: '77 N Kainalu Dr, Kailua, HI 96734',
    post: 96734,
  });

  const onClickHandler = () => {
    // click한 시점의 delivery를 dispatch로 store에 보내야함, 유저 정보 변경
  };

  return (
    <Container>
      <h1>Delivery Info</h1>
      <form style={{ width: '70%' }}>
        <FormControl>
          <label>First Name</label>
          <input
            type="text"
            value={delivery.firstName}
            onChange={({ target: { value } }) => {
              setDelivery({ ...delivery, firstName: value });
            }}
          ></input>
        </FormControl>
        <FormControl>
          <label>Last Name</label>
          <input
            type="text"
            value={delivery.lastName}
            onChange={({ target: { value } }) => {
              setDelivery({ ...delivery, lastName: value });
            }}
          ></input>
        </FormControl>
        <FormControl>
          <label>Shipping Address </label>
          <input
            type="text"
            value={delivery.address}
            onChange={({ target: { value } }) => {
              setDelivery({ ...delivery, address: value });
            }}
          ></input>
        </FormControl>
        <FormControl>
          <label>Postal Code</label>
          <input
            type="text"
            value={delivery.post}
            onChange={({ target: { value } }) => {
              setDelivery({ ...delivery, post: value });
            }}
          ></input>
        </FormControl>
      </form>
      <Button onClick={onClickHandler}>Edit Delivery Info</Button>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem #ff6f00;
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  grid-area: deliveryInfo;
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
