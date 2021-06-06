import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userinfo } from '../../actions/mypage';

import Header from '../Header';

import UserInfo from './UserInfo';
import DeliveryInfo from './DelivaryInfo';
import Keywords from './Keywords';
import OrderHistory from './OrderHistory';
import LikedItems from './LikedItems';

import baseUrl from '../../url';

export default function Mypage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('at mypage token', token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    axios
      .get(baseUrl + '/api/user/', config)
      .then((res) => {
        console.log('GET USER INFO', res.data);
        dispatch(userinfo(res.data));
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <>
      <Header type="logo" />
      <Container>
        <UserInfo />
        <DeliveryInfo />
        <Keywords />
        <OrderHistory />
        <LikedItems />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 70vw;
  height: calc(100% - 15rem);
  margin: 14rem auto 3rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'userInfo keyword liked'
    'deliveryInfo history liked';
  grid-gap: 2rem;
`;
