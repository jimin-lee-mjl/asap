import React from 'react';
import LikesList from './likesList';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';
import HeaderComponent from '../Header';

export default function Likes() {
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
          <h1>Your Likes</h1>
        </div>
        <LikesList />
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
