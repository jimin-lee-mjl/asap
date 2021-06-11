import React from 'react';
import styled from 'styled-components';

export default function Keywords() {
  const keywords = [
    'armour',
    'clingy',
    'dryer',
    'easy',
    'golfer',
    'halloween',
    'hardly',
    'jewels',
    'july',
    'maroon',
    'mexico',
    'precioso',
    'rap',
    'replacement',
    'sandals',
    'sheriff',
    'showing',
    'steamed',
    'subtle',
    'tinted',
    'anorexic',
    'better',
    'cheeseburgers',
    'date',
    'earrings',
    'fishing',
    'frustration',
    'handkerchief',
    'malfunctioned',
    'ornate',
    'panatime',
    'printing',
    'purchase',
    'queda',
    'sakura',
    'shows',
    'skimpy',
    'straw',
    'unorthodox',
    'walking',
  ];
  return (
    <Container>
      <h2>Keywords</h2>
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
  height: 35rem;
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
  width: 90%;
  height: 80%;
  overflow: auto;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
`;

const KeywordCard = styled.div`
  background-color: rgba(196, 196, 196, 0.4);
  border-radius: 0.5rem;
  width: 45%;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0.5rem;
`;
