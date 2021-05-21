import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

export default function MyPage() {
  return (
    <Container>
      <Nav>
        <button>Home</button>
      </Nav>
      <Header>
        <h1>My Page</h1>
      </Header>
      <Profile>
        <h1>Profile</h1>
        <Avatar shape="square" style={{ backgroundColor: 'gray' }} size={64}>
          User
        </Avatar>
        <article>
          <h2>ID: elice</h2>
          <h2>Password: ********* </h2>
          <h2>Email: elice@elice.com </h2>
          <h2>Gender: Women </h2>
          <h2>age: 20 </h2>
          <h2>Size: M </h2>
        </article>
        <button>edit</button>
      </Profile>
      <Keyword>Keyword</Keyword>
      <Color>Color</Color>
      <Budget>Budget</Budget>
      <Liked>
        Liked
        <button>더보기</button>
        <div></div>
      </Liked>
      <Purchased>
        Purchased
        <button>더보기</button>
      </Purchased>
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
  text-align: right;
`;

const Header = styled.main`
  background: #81ecec;
  grid-area: header;
  text-align: center;
`;

const Profile = styled.div`
  background: #80deea;
  grid-area: profile;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
