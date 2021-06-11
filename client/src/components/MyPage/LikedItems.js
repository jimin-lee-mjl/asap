import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { showModal } from '../../actions/productsActions';

export default function LikedItems() {
  const history = useHistory();
  const asins = useSelector((state) => state.auth.user.like_items);

  return (
    <Container>
      <h2>Liked Items</h2>
      <ScrollingList>
        {asins.map((n) => {
          return <ItemCard productId={n}></ItemCard>;
        })}
      </ScrollingList>
      <Button
        onClick={() => {
          history.push('/likes');
        }}
      >
        Add to Cart
      </Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
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
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;

  :hover {
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;
