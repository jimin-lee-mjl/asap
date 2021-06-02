import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header/withLogo';
import axios from 'axios';

export default function Mypage() {
  const user = {
    email: 'elice@elice.com',
    password: '123456',
  };

  const delivery = {
    firstName: 'Harry',
    lastName: 'Potter',
    address: '77 N Kainalu Dr, Kailua, HI 96734',
    post: 96734,
  };

  const keywords = [
    'fit',
    'office',
    'great',
    'awesome',
    'pink',
    'yellow',
    'black',
    'white',
    'gray',
  ];
  const asins = [2, 3, 4, 15, 17, 18];

  return (
    <>
      <Header />
      <Container>
        <UserInfo>
          <h1>User Info</h1>
          <form style={{ width: '70%' }}>
            <FormControl>
              <label>email</label>
              <input type="email" value={user.email}></input>
            </FormControl>
            <FormControl>
              <label>password</label>
              <input type="password" value={user.password}></input>
            </FormControl>
          </form>
          <div>
            <button>Change Password</button>
            <button>Delete Account</button>
          </div>
        </UserInfo>
        <DeliveryInfo>
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
        </DeliveryInfo>
        <Keyword>
          <h1>Keywords</h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35rem',
            }}
          >
            {keywords.map((word) => {
              return (
                <div
                  style={{
                    backgroundColor: 'rgba(196, 196, 196, 0.4)',
                    width: '10rem',
                    height: '3rem',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1rem 0.5rem',
                  }}
                >
                  <h4>{word}</h4>
                </div>
              );
            })}
          </div>
          <button>more</button>
        </Keyword>
        <History>
          <h1>Order History</h1>
          <div style={{ width: '80%', height: '70%' }}>
            <div
              style={{
                display: 'block',
                backgroundColor: 'rgba(196, 196, 196, 0.4)',
                width: '100%',
                height: '7rem',
                margin: '1rem 0',
              }}
            ></div>
            <div
              style={{
                display: 'block',
                backgroundColor: 'rgba(196, 196, 196, 0.4)',
                width: '100%',
                height: '7rem',
                margin: '1rem 0',
              }}
            ></div>
            <div
              style={{
                display: 'block',
                backgroundColor: 'rgba(196, 196, 196, 0.4)',
                width: '100%',
                height: '7rem',
                margin: '1rem 0',
              }}
            ></div>
          </div>
          <button>more</button>
        </History>
        <Liked>
          <h1>Liked Items</h1>
          <ItemCards>
            {asins.map((n) => {
              return <ItemCard productId={n}></ItemCard>;
            })}
          </ItemCards>
          <button>more</button>
        </Liked>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 70vw;
  height: calc(100% - 20rem);
  margin: 18rem auto 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'userInfo keyword liked'
    'deliveryInfo history liked';
  grid-gap: 3rem;
`;

const UserInfo = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: userInfo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const DeliveryInfo = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: deliveryInfo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Keyword = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: keyword;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const History = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: history;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Liked = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: liked;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Profile

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

// Liked Items
function ItemCard({ productId }) {
  const [item, setItem] = useState({});

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => console.log(err));
    setItem(response.data);
  };

  useEffect(() => {
    if (productId && productId !== '') {
      fetchProductDetail();
    }
  }, [productId]);

  return (
    <>
      {Object.keys(item).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div
          style={{
            width: '40%',
            height: '25%',
            border: '1px solid black',
            margin: '1rem',
            padding: '0.5rem',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          {/* <p>
            {item.id}.{item.title}
          </p> */}
        </div>
      )}
    </>
  );
}

const ItemCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 80%;
`;
