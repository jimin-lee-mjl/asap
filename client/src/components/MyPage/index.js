import React from 'react';
import styled from 'styled-components';

export default function MyPage({ user }) {
  return (
    <Container>
      <Nav>Navbar</Nav>
      <Header>Header</Header>
      <Profile>Profile</Profile>
      <Keyword>Keyword</Keyword>
      <Color>Color</Color>
      <Budget>Budget</Budget>
      <Liked>Liked</Liked>
      <Purchased>Purchased</Purchased>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 80vw;
  height: 80vh;
  border: solid 1px black;
  grid-template-columns: 1fr 0.5fr 0.5fr 1fr;
  grid-template-rows: 0.4fr 0.6fr 3fr 3fr;
  grid-template-areas:
    'nav nav nav nav'
    'header header header header'
    'profile keyword keyword liked'
    'profile color budget purchased';
  grid-gap: 0.2rem;
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap');
  font-family: 'Rubik', sans-serif;
  text-transform: uppercase;

  @media only screen and (max-width: 550px) {
    width: 100vw;
    height: 100vh;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1.2fr 1.2fr 1.2fr;
    grid-template-areas:
      'nav nav'
      'header header'
      'profile profile'
      'keyword keyword'
      'color budget'
      'liked liked'
      'purchased purchased';
  }
`;

const Nav = styled.nav`
  background: #a7ffeb;
  grid-area: nav;
`;

const Header = styled.main`
  background: #81ecec;
  grid-area: header;
`;

const Profile = styled.div`
  background: #80deea;
  grid-area: profile;
`;

const Keyword = styled.div`
  background: #80deea;
  grid-area: keyword;
`;

const Color = styled.div`
  background: #80deea;
  grid-area: color;
`;

const Budget = styled.div`
  background: #80deea;
  grid-area: budget;
`;

const Liked = styled.div`
  background: #80deea;
  grid-area: liked;
`;

const Purchased = styled.div`
  background: pink;
  grid-area: purchased;
`;
