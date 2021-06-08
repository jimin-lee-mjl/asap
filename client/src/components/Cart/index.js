import React from 'react';
import CartList from './cartList';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';

export default function Cart() {
  return (
    <CartContainer>
      <div style={{ width: '1000px', textAlign: 'left' }}>
        <h1>Shopping Cart</h1>
      </div>
      <CartList />
      <ProductDetailModal />
    </CartContainer>
  );
}

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 100px;
`;
