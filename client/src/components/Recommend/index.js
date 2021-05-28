import React, { useState } from 'react';
import { Card, Typography, Col, Row } from 'antd';
import { ProductContext } from './UserContext';
import ProductCardGroups from './productCardGroups';
import ChoiceSummary from './choiceSummary';
import Navigator from './navigator';
import styled from 'styled-components';
import 'antd/dist/antd.css';

export default function Recommend() {
  const { Title } = Typography;

  return (
    <Container>
      <div style={{ margin: '30px auto' }}>
        <div style={{ margin: 50 }}>
          <Title>
            사용자님의 정보와 취향 키워드를 반영한<br></br>예산 10만원 내 추천
            제품입니다
          </Title>
        </div>
        <div style={{ display: 'flex' }}>
          <ProductCardGroups />
          <ChoiceSummary />
        </div>
        <Navigator />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: '90vh';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
