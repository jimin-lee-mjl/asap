import React from 'react';
import styled from 'styled-components';

export default function Keywords() {
  const keywords = [
    'fit',
    'office',
    'great',
    'awesome',
    'pink',
    'yellow',
    'black',
    'white',
    'gray',
    'fit',
    'office',
    'great',
    'awesome',
    'pink',
    'yellow',
    'black',
    'white',
    'gray',
    'fit',
    'office',
    'great',
    'awesome',
    'pink',
    'yellow',
    'black',
    'white',
    'gray',
    'fit',
    'office',
    'great',
    'awesome',
    'pink',
    'yellow',
    'black',
    'white',
    'gray',
  ];
  return (
    <Container>
      <h1>Keywords</h1>
      <ScrollingList>
        {keywords.map((word) => {
          return <KeywordCard>{word}</KeywordCard>;
        })}
      </ScrollingList>
      {/* <button>Edit</button> */}
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem #ff6f00;
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  grid-area: keyword;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ScrollingList = styled.div`
  width: 80%;
  height: 30rem;
  overflow: auto;
  margin: 2rem auto;

  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  /* width: 35rem */
`;

const KeywordCard = styled.div`
  background-color: rgba(196, 196, 196, 0.4);
  border-radius: 0.5rem;
  width: 40%;
  height: 5rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0.5rem;
`;
