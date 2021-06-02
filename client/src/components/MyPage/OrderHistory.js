import React from 'react';
import styled from 'styled-components';

export default function OrderHistory() {
  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: history;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
