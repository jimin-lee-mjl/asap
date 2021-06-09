import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeDelivery, loadUser } from '../../actions/auth';

export default function DeliveryInfo({ user }) {
  const dispatch = useDispatch();
  console.log('user from deliveryinfo', user);

  const [delivery, setDelivery] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    address: user.address,
    post: user.postal_code,
  });

  const onClickHandler = () => {
    dispatch(
      changeDelivery({
        first_name: delivery.firstName,
        last_name: delivery.lastName,
        address: delivery.address,
        postal_code: delivery.post,
      }),
    );
    dispatch(loadUser());
  };

  return (
    <Container>
      <h2>Delivery Info</h2>
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
  height: 40rem;
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
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  position: relative;

  label {
    color: #33032d;
    display: block;
    margin-bottom: 0.5rem;
    text-align: left;
    font-size: 1rem;
  }

  input {
    border-radius: 0.5rem;
    border: gray solid 0.2rem;
    display: block;
    width: 100%;
    font-size: 1.2rem;
    padding: 7px;
  }
`;

const Button = styled.button`
  background: #ff6f00;
  margin: 0 1rem;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;

  :hover {
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;
