import React from 'react';
import LikesList from './likesList';
import styled from 'styled-components';

export default function Likes() {
  return (
    <LikesContainer>
      <div style={{ width: '1000px' }}>
        <h1>Your Likes</h1>
      </div>
      <LikesList />
    </LikesContainer>
  );
}

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 100px;
`;
