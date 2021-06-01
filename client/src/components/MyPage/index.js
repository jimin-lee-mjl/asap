import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';

function ItemCard({ productId }) {
  const [item, setItem] = useState({});

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => console.log(err));
    setItem(response.data);
  };

  useEffect(() => {
    if (productId && productId !== '') {
      fetchProductDetail();
    }
  }, [productId]);

  return (
    <>
      {Object.keys(item).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div
          style={{
            width: '240px',
            height: '380px',
            border: '1px solid black',
            margin: '1rem',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '230px', height: '300px', objectFit: 'contain' }}
          />
          <p>
            {item.id}.{item.title}
          </p>
        </div>
      )}
    </>
  );
}

function MyPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const keywords = ['fit', 'office', 'great', 'awesome'];
  const asins = [1, 2, 3, 4, 15, 6, 17, 18];

  return (
    <>
      <Button
        style={{
          position: 'absolute',
          top: '1rem',
          right: '18rem',
          margin: '0',
          zIndex: '10',
        }}
        onClick={() => {
          history.push('/');
        }}
      >
        Back
      </Button>
      <Button
        style={{
          position: 'absolute',
          top: '1rem',
          right: '10rem',
          margin: '0',
          zIndex: '10',
        }}
        onClick={() => {}}
      >
        Edit
      </Button>
      <Button
        style={{
          position: 'absolute',
          top: '1rem',
          right: '2rem',
          margin: '0',
          zIndex: '10',
        }}
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>

      <Header />
      <Title>My Page</Title>
      <Container>
        <Content>
          <h1>Information</h1>
          <InformationBox>
            I'm <B>elice22✋</B>! <br />
            Interested in <B>WOMAN'S FASHION👗</B> <br />
            Usually shopping with <B>$300💰</B>
          </InformationBox>
        </Content>
        <Content>
          <h1>Favorite Color</h1>
          <img
            style={{
              width: '15vw',
              height: '25vh',
              objectFit: 'cover',
            }}
            alt="green"
            src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          />
        </Content>
        <Content>
          <h1>Keywords</h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {keywords.map((word) => {
              return (
                <div
                  style={{
                    backgroundColor: 'rgba(196, 196, 196, 0.4)',
                    width: '7rem',
                    height: '1.5rem',
                    marginLeft: '0.5rem',
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </Content>
        <Content>
          <h1>Liked Items</h1>
          <ItemCards>
            {asins.map((n) => {
              return <ItemCard productId={n}></ItemCard>;
            })}
          </ItemCards>
        </Content>
      </Container>
    </>
  );
}

export default MyPage;

const Header = styled.div`
  position: absolute;
  top: 0;
  background-image: url('header.jpg');
  width: 100vw;
  height: 20vh;
  background-repeat: repeat;
`;

const Title = styled.div`
  background-image: url('orange.png');
  position: absolute;
  top: 15vh;
  width: 30vw;
  height: 13vh;
  text-align: right;
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  padding-top: 3vh;
  padding-right: 20px;
`;

const Container = styled.div`
  margin-top: 30vh;
  width: 100%;
  height: auto;
  text-align: center;
  position: absolute;
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
`;

const Content = styled.div`
  margin-bottom: 5vh;
  text-align: center;
`;

const InformationBox = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  background-color: rgba(196, 196, 196, 0.4);
  width: 40vw;
  height: auto;
  margin: auto;
  padding: 1.5rem;
`;

const B = styled.h3`
  font-weight: bold;
  display: inline;
`;

const ColorImg = styled.img`
  width: 15vw;
  height: 25vh;
`;

const Keyword = styled.div`
  background-color: rgba(196, 196, 196, 0.4);
`;

const ItemCards = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  align-items: center;
  width: 1100px;
  flex-wrap: wrap;
  margin: auto;
`;

const Button = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
  background: black;
  width: 120px;
  height: 50px;
  font-size: 1.3rem;
  color: white;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2.5;

  :hover {
    color: black;
    background: white;
    border: solid black 2px;
  }
`;
