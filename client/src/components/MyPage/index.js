import React from 'react';
import styled from 'styled-components';

import Header from '../Header';

import UserInfo from './UserInfo';
import DeliveryInfo from './DelivaryInfo';
import Keywords from './Keywords';
import OrderHistory from './OrderHistory';
import LikedItems from './LikedItems';

export default function Mypage() {
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
  height: calc(100% - 25rem);
  margin: 18rem auto 5rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'userInfo keyword liked'
    'deliveryInfo history liked';
  grid-gap: 2rem;
`;
