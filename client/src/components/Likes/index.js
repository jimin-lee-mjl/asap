import React from 'react';
import LikesList from './likesList';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';

export default function Likes() {
  return (
    <LikesContainer>
      <div style={{ width: '1000px', textAlign: 'left' }}>
        <h1>Your Likes</h1>
      </div>
      <LikesList />
      <ProductDetailModal />
    </LikesContainer>
  );
}

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 100px;
`;
