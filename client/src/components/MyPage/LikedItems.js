import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

export default function LikedItems() {
  const asins = [2, 3, 4, 15, 17, 18];
  return (
    <Container>
      <h1>Liked Items</h1>
      <ItemCards>
        {asins.map((n) => {
          return <ItemCard productId={n}></ItemCard>;
        })}
      </ItemCards>
      <button>more</button>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: liked;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 80%;
`;
