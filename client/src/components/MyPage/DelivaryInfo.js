import React from 'react';
import styled from 'styled-components';

export default function DeliveryInfo() {
  const delivery = {
    firstName: 'Harry',
    lastName: 'Potter',
    address: '77 N Kainalu Dr, Kailua, HI 96734',
    post: 96734,
  };

  return (
    <Container>
      <h1>Delivery Info</h1>
      <form style={{ width: '70%' }}>
        <FormControl>
          <label>First Name</label>
          <input type="text" value={delivery.firstName}></input>
        </FormControl>
        <FormControl>
          <label>Last Name</label>
          <input type="text" value={delivery.lastName}></input>
        </FormControl>
        <FormControl>
          <label>Shipping Address </label>
          <input type="text" value={delivery.address}></input>
        </FormControl>
        <FormControl>
          <label>Postal Code</label>
          <input type="text" value={delivery.post}></input>
        </FormControl>
      </form>
      <button>Edit Delivery Info</button>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
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
