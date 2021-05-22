import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import ProductCardGroup from './productCardGroup';
import ProductDetail from './productDetail';
import { ProductContext } from './UserContext';
import ChoiceSummary from './choiceSummary';

import './recommend.css';
import 'antd/dist/antd.css';

export default function Recommend() {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);

  return (
    <ProductContext.Provider value={{ visible, setVisible }}>
      <Container>
        <div>
          <div style={{ margin: 50 }}>
            <Title>
              사용자님의 정보와 취향 키워드를 반영한<br></br>예산 10만원 내 추천
              제품입니다
            </Title>
          </div>
          <ProductCardGroup />
          <ChoiceSummary />
        </div>
        <ProductDetail />
      </Container>
    </ProductContext.Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
