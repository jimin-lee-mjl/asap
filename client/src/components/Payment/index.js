import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HeaderComponent from '../Header';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import baseUrl from '../../url';
import DeliveryInfo from './DeliveryInfo';
import OrderTable from './OrderTable';

export default function Payment() {
  const history = useHistory();
  const user = useSelector((state) => state.mypage);
  const authToken = localStorage.getItem('token');
  const order = useSelector((state) => state.orderReducer.orderList);

  const [delivery, setDelivery] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    address: user.address,
    post: user.postal_code,
  });

  let totalPrice = 0;
  order.forEach((el) => {
    totalPrice += el.price;
  });
  console.log('total price', totalPrice);

  const totalItems = order.map((el) => el.key);
  console.log('totalItems', totalItems);

  const [check, setCheck] = useState(false);

  const tokenConfig = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (authToken) {
      config.headers['Authorization'] = `Token ${authToken}`;
      console.log(`Token ${authToken}`);
    }
    return config;
  };

  // Call your server to set up the transaction with Paypal
  function createOrder(data, actions) {
    const body = {
      total_price: totalPrice,
    };
    return axios
      .post(baseUrl + 'api/payment/', body, tokenConfig())
      .then((res) => {
        return res.data.order_id;
      })
      .catch((err) => console.log(err.response));
  }

  function AddOrderHistory() {
    const body = {
      items: totalItems,
      total_price: totalPrice,
      first_name: delivery.firstName,
      last_name: delivery.lastName,
      email: delivery.email,
      address: delivery.address,
      postal_code: delivery.post,
      is_saving_address: check,
    };
    axios
      .post(baseUrl + 'api/order/', body, tokenConfig())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));
  }

  // Call your server to finalize the transaction with Paypal
  function onApprove(data, actions) {
    return axios
      .post(baseUrl + 'api/payment/' + data.orderID + '/', null, tokenConfig())
      .then((res) => {
        if (authToken) {
          AddOrderHistory();
        }
        alert('order completed');
        return res;
      })
      .then(history.push('/'))
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      {authToken ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <Container>
        <DeliveryInfo
          delivery={delivery}
          setDelivery={setDelivery}
          check={check}
          setCheck={setCheck}
        />

        <OrderInfo>
          <OrderTable totalPrice={totalPrice} />
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            style={{
              layout: 'horizontal',
              color: 'gold',
              shape: 'pill',
              size: 'responsive',
              tagline: 'false',
            }}
          />
        </OrderInfo>
      </Container>
    </>
  );
}

const Container = styled.div`
  flex: 1;
  width: 70vw;
  height: 80%;
  margin: 10rem auto 1rem auto;
  display: flex;
`;

const OrderInfo = styled.div`
  padding: 10rem 2rem;
  width: 35vw;
  display: flex;
  flex-direction: column;
`;
