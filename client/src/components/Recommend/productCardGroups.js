import React, { useEffect, useState } from 'react';
import { Col, Typography } from 'antd';
import ProductCard from './productCard';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, loadLikes } from '../../actions/productsActions';

export default function ProductCardGroups() {
  const { Title } = Typography;

  const products = useSelector((state) => state.setProductsReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
    dispatch(loadLikes());
  }, []);

  console.log('Products :', products);

  const renderCardGroup = () => {
    const cardGroupArray = [];
    Object.entries(products).map((product) => {
      const category = product[0];
      const productList = product[1];

      if (productList.length == 0) {
        return false;
      }
      const categoryTitle = category.toUpperCase();
      cardGroupArray.push(
        <ProductCardGroup key={category}>
          <Col span={3}>
            <Title level={2}>{categoryTitle}</Title>
          </Col>
          <ProductCardCol span={20}>
            <ProductCard categoryKey={category} />
          </ProductCardCol>
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

const ProductCardCol = styled(Col)`
  display: flex;
  align-items: center;
  overflow-x: scroll;
`;
