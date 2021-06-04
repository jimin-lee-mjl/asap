import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { Table } from 'antd';
import HeaderComponent from '../Header';

export default function Payment() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [delivery, setDelivery] = useState({
    firstName: 'Harry',
    lastName: 'Potter',
    address: '77 N Kainalu Dr, Kailua, HI 96734',
    post: 96734,
  });

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const columns = [
    {
      title: 'Item code',
      dataIndex: 'asin',
    },
    {
      title: 'Item Name',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      className: 'column-price',
      dataIndex: 'price',
      align: 'right',
    },
  ];

  const data = [
    {
      asin: '100045442',
      title: 'blue hoody',
      price: 20,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
    {
      asin: '40599922',
      title: 'gray jogger',
      price: 30,
    },
  ];

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
              dataSource={data}
              bordered
              footer={() => 'Total : $1000'}
              pagination={false}
              scroll={{ y: 200 }}
            />
          </div>
          <br />
          <br />
          <Button>Pay with Paypal</Button>
        </OrderInfo>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 70vw;
  height: calc(100% - 25rem);
  margin: 18rem auto 5rem auto;
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
