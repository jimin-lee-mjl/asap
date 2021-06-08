import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { Table } from 'antd';
import HeaderComponent from '../Header';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import baseUrl from '../../url';

export default function Payment() {
  const user = useSelector((state) => state.mypage);
  const authToken = localStorage.getItem('token');
  console.log('authToken', authToken);
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
    console.log(el.price);
    totalPrice += el.price;
  });
  console.log('total price', totalPrice);

  const totalItems = order.map((el) => el.key);
  console.log('totalItems', totalItems);

  const [check, setCheck] = useState(false);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'key',
      width: '20%',
    },
    {
      title: 'Image',
      dataIndex: 'ImageURL',
      render: (url) => (
        <img alt={url} src={url} style={{ width: '80%', height: 'auto' }} />
      ),
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      className: 'column-price',
      dataIndex: 'price',
      align: 'right',
      width: '15%',
    },
  ];

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
        console.log('createOrder orderID', res.data.order_id);
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
    console.log('order history add ', body);
    axios
      .post(baseUrl + 'api/order/', body, tokenConfig())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));
  }

  // Call your server to finalize the transaction with Paypal
  function onApprove(data, actions) {
    console.log('onApprove orderID', data.orderID);

    return axios
      .post(baseUrl + 'api/payment/' + data.orderID + '/', null, tokenConfig())
      .then((res) => {
        console.log('onApprove response', res);
        if (authToken) {
          AddOrderHistory();
        }
        return res;
      })
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
        <DeliveryInfo>
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
        </DeliveryInfo>
        <OrderInfo>
          <div>
            <h1>Your Order</h1>
            <br />
            <Table
              columns={columns}
              dataSource={order}
              bordered
              footer={() => `Total : $${totalPrice}`}
              pagination={false}
              scroll={{ y: 200 }}
              style={{ marginBottom: '5rem' }}
            />
          </div>
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

const DeliveryInfo = styled.div`
  padding: 10rem 2rem;
  width: 35vw;
`;

const OrderInfo = styled.div`
  padding: 10rem 2rem;
  width: 35vw;
  display: flex;
  flex-direction: column;
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
