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
  ];
  return (
    <Container>
      <h1>Keywords</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '35rem',
        }}
      >
        {keywords.map((word) => {
          return (
            <div
              style={{
                backgroundColor: 'rgba(196, 196, 196, 0.4)',
                width: '10rem',
                height: '3rem',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '1rem 0.5rem',
              }}
            >
              <h4>{word}</h4>
            </div>
          );
        })}
      </div>
      <button>more</button>
    </Container>
  );
}

const Container = styled.div`
  border: solid 0.1rem black;
  padding: 2rem 1rem;
  grid-area: keyword;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
