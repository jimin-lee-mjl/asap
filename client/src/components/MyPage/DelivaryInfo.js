import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import baseUrl from '../../url';
import { useSelector, useDispatch } from 'react-redux';
import { userinfo } from '../../actions/mypage';

export default function DeliveryInfo() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.mypage);

  const [delivery, setDelivery] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    address: user.address,
    post: user.postal_code,
  });

  const onClickHandler = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const body = {
      first_name: delivery.firstName,
      last_name: delivery.lastName,
      address: delivery.address,
      postal_code: delivery.post,
    };
    axios
      .patch(baseUrl + '/api/user/delivery/', body, config)
      .then((res) => {
        console.log('change delivery info SUCCESSED', res);
        alert('Delivery Information successfully updated.');
        dispatch(userinfo(body));
      })
      .catch((err) => {
        console.log(err.response);
        alert('Update failed. Please try again.');
      });
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
