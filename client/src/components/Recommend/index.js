import React, { useState } from 'react';
import { Card, Typography, Col, Row } from 'antd';
import ProductCardGroups from './productCardGroups';
import ChoiceSummary from './choiceSummary';
import Navigator from './navigator';
import styled from 'styled-components';
import 'antd/dist/antd.css';

export default function Recommend() {
  const { Title } = Typography;

  return (
    <Container>
      <Header>
        <Title>
          사용자님의 정보와 취향 키워드를 반영한<br></br>예산 10만원 내 추천
          제품입니다
        </Title>
      </Header>
      <Body>
        <ProductCardGroups />
        <ChoiceSummary />
      </Body>
      <Navigator />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
`;

const Header = styled.div`
  margin: 50px;
`;

const Body = styled.div`
  display: flex;
`;
