import React from 'react';
import CartList from './cartList';
import styled from 'styled-components';

export default function Cart() {
  return (
    <CartContainer>
      <div style={{ width: '1000px' }}>
        <h1>Shopping Cart</h1>
      </div>
      <CartList />
    </CartContainer>
  );
}

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 100px;
`;
