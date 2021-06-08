import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { Table } from 'antd';
import HeaderComponent from '../Header';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import baseUrl from '../../url';
import DeliveryInfoComponent from '../MyPage/DelivaryInfo';

export default function Payment() {
  const user = useSelector((state) => state.mypage);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const order = useSelector((state) => state.orderReducer.orderList);
  console.log('order data at payment', order);

  const [delivery, setDelivery] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    address: user.address,
    post: user.postal_code,
  });

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'key',
      width: '20%',
    },
    {
      title: 'Image',
      dataIndex: 'ImageURL',
      render: (theImageURL) => (
        <img
          alt={theImageURL}
          src={theImageURL}
          style={{ width: '80%', height: 'auto' }}
        />
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

  const [orderId, setOrderId] = useState('');

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrftoken = getCookie('csrftoken'); // django에 csrf 토큰 보내야함, 안보내면 오류 발생할 수 있음

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  // Call your server to set up the transaction
  function createOrder(data, actions) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    const body = {
      total_price: 1,
    };

    return axios
      .post(baseUrl + 'api/payment/', body, config)
      .then((res) => {
        console.log(res);
        console.log(res.data.order_id);
        setOrderId(res.data.order_id);
        return res.data.order_id;
      })
      .catch((err) => console.log(err.response));
  }

  // Call your server to finalize the transaction
  function onApprove(data, actions) {
    console.log('onApprove', data.orderID);
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    return axios
      .post(baseUrl + 'api/payment/' + data.orderID + '/', null, config)
      .then((res) => {
        console.log('onApprove response', res);
        return res;
      })
      .then((orderData) => {
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you

        // This example reads a v2/checkout/orders capture response, propagated from the server
        // You could use a different API or structure for your 'orderData'
        const errorDetail =
          Array.isArray(orderData.details) && orderData.details[0];

        if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
          return actions.restart(); // Recoverable state, per:
          // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
        }

        if (errorDetail) {
          var msg = 'Sorry, your transaction could not be processed.';
          if (errorDetail.description) msg += '\n\n' + errorDetail.description;
          if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
          return alert(msg); // Show a failure message
        }

        // Show a success message
        alert('Transaction completed by ' + orderData.payer.name.given_name);
      });
  }

  return (
    <>
      {/* {true ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )} */}
      <HeaderComponent type="logo" />
      <Container>
        <DeliveryInfo>
          <h1>Delivery Info</h1>
          <br />
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
          <Check onChange={onChange}>
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
              footer={() => 'Total : $1000'}
              pagination={false}
              scroll={{ y: 200 }}
              style={{ marginBottom: '1rem' }}
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
  padding: 5rem;
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
    font-size: 1.5rem;
  }

  input {
    border-radius: 0.5rem;
    border: gray solid 0.2rem;
    display: block;
    width: 100%;
    font-size: 1.8rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const Button = styled.div`
  background: black;
  color: white;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  border: solid black 0.2rem;
  margin: 1rem auto;
  width: 70%;

  :hover {
    color: black;
    background: white;
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
