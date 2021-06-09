import React from 'react';
import CartList from './cartList';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';
import HeaderComponent from '../Header';

export default function Cart() {
  const authToken = localStorage.getItem('token');

  return (
    <>
      {authToken ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <RootContainer>
        <div style={{ width: '100%', textAlign: 'left' }}>
          <h1>Shopping Cart</h1>
        </div>
        <CartList />
        <ProductDetailModal />
      </RootContainer>
    </>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: auto;
  margin-top: 13rem;
`;
