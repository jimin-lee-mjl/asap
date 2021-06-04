import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

export default function LikedItems() {
  const asins = [2, 3, 4, 15, 17, 18, 2, 3, 4, 15, 17, 18];
  return (
    <Container>
      <h1>Liked Items</h1>
      <ScrollingList>
        {asins.map((n) => {
          return <ItemCard productId={n}></ItemCard>;
        })}
      </ScrollingList>
      <Button>Add to Cart</Button>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem #ff6f00;
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  grid-area: liked;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 80%;
  height: 80%;
  overflow: auto;
`;

const Button = styled.button`
  background: #ff6f00;
  margin: 0 1rem;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  :hover {
    box-shadow: 2px 4px 8px #ffb300;
  }
`;
