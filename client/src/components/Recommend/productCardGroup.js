import React, { useState, useContext } from 'react';
import { Col, Typography } from 'antd';
import ProductCard from './productCard';
import { ProductContext } from './UserContext';
import styled from 'styled-components';

export default function ProductCardGroup() {
  const { visible, setVisible } = useContext(ProductContext);
  const { Title } = Typography;

  return (
    <ProductCardGroupContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        className="product-card-group"
      >
        <Col span={3}>
          <Title level={2}>상의</Title>
        </Col>
        <Col
          span={15}
          style={{
            display: 'flex',
            alignItems: 'center',
            overflowX: 'scroll',
          }}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Col>
      </div>
    </ProductCardGroupContainer>
  );
}

const ProductCardGroupContainer = styled.div`
  padding-left: 200px;
  margin-bottom: 50px;
`;
