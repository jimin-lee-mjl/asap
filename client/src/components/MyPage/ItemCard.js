import React from 'react';
import styled from 'styled-components';
import { showModal } from '../../actions/productsActions';
import { useDispatch } from 'react-redux';

export default function ItemCard({ productId }) {
  const imageUrl = `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${productId}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL250`;
  const dispatch = useDispatch();

  return (
    <Container>
      <img
        src={imageUrl}
        alt={productId}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onClick={(e) => {
          dispatch(showModal(productId));
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 40%;
  height: 25%;
  border: 1px solid black;
  border-radius: 0.8rem;
  margin: 1rem;
  padding: 0.5rem;
  cursor: pointer;

  :hover {
    border: solid 0.1rem #ff6f00;
    box-shadow: 0 0 10px #ffecb3;
  }
`;
