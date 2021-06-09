import React, { useState } from 'react';
import { Card, Typography, Col, Row } from 'antd';
import ProductCardGroups from './productCardGroups';
import ChoiceSummary from './choiceSummary';
import Navigator from './navigator';
import ProductDetailModal from './productDetailModal';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import HeaderComponent from '../Header';

export default function Recommend() {
  const authToken = localStorage.getItem('token');
  const { Title } = Typography;

  return (
    <>
      {authToken ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <Container>
        <Header>
          <p>
            These are recommended items based on your information and keywords.
          </p>
        </Header>
        <Body>
          <ProductCardGroups />
          <ProductDetailModal />
          <ChoiceSummary />
        </Body>
        <Navigator />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 13rem;
`;

const Header = styled.div`
  align-self: start;
  font-size: 2rem;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
`;
