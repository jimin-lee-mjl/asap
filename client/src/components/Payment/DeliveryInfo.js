import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';

export default function DeliveryInfo({
  delivery,
  setDelivery,
  check,
  setCheck,
}) {
  return (
    <Container>
      <h1>Delivery Info</h1>
      <form style={{ width: '70%', margin: 'auto' }}>
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
          <label>Email</label>
          <input
            type="text"
            value={delivery.email}
            onChange={({ target: { value } }) => {
              setDelivery({ ...delivery, email: value });
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
      <Check
        onChange={() => {
          setCheck(!check);
        }}
      >
        <h3>Save this Delivery Info</h3>
      </Check>
    </Container>
  );
}

const Container = styled.div`
  padding: 10rem 2rem;
  width: 35vw;
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
    font-size: 1.2rem;
  }

  input {
    border-radius: 0.5rem;
    border: gray solid 0.2rem;
    display: block;
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }
`;

const Check = styled(Checkbox)`
  .ant-checkbox-wrapper {
    font-size: 2rem;
    margin: 2rem;
    padding: 1rem;
    width: 25%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff6f00;
    border-color: #ff6f00;
  }

  .ant-checkbox-checked::after {
    border: 1px solid #ff6f00;
  }
`;
