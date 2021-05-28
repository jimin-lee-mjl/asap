import React, { useEffect, useState, useContext } from 'react';
import { Col, Typography } from 'antd';
import { ProductContext } from './UserContext';
import ProductCard from './productCard';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../actions/productsActions';

export default function ProductCardGroups() {
  const { Title } = Typography;

  const products = useSelector((state) => state.setProductsReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, []);

  console.log('Products :', products);

  const renderCardGroup = () => {
    const cardGroupArray = [];
    Object.entries(products).map((product) => {
      console.log(product);
      const category = product[0];
      const productList = product[1];

      if (productList.length == 0) {
        return false;
      }

      cardGroupArray.push(
        <ProductCardGroup key={category}>
          <Col span={3}>
            <Title level={2}>{category}</Title>
          </Col>
          <Col
            span={20}
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'scroll',
            }}
          >
            <ProductCard categoryKey={category} />
          </Col>
        </ProductCardGroup>,
      );
    });

    return cardGroupArray;
  };

  return (
    <ProductCardGroupContainer>{renderCardGroup()}</ProductCardGroupContainer>
  );
}

const ProductCardGroupContainer = styled.div`
  margin-bottom: 50px;
  width: 1250px;
`;

const ProductCardGroup = styled.div`
  display: flex;
  align-items: center;
`;
