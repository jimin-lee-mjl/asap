import React, { useEffect, useState, useContext } from 'react';
import { Col, Typography } from 'antd';
import { ProductContext } from './UserContext';
import ProductCard from './productCard';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../actions/productsActions';

export default function ProductCardGroups() {
  const { visible, setVisible } = useContext(ProductContext);
  const { Title } = Typography;

  const products = useSelector((state) => state.setProductsReducer.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get('https://fakestoreapi.com/products/category/jewelery?limit=4')
      .catch((err) => {
        console.log('Err: ', err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log('Products :', products);

  return (
    <ProductCardGroupContainer>
      <ProductCardGroup>
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
        </Col>
      </ProductCardGroup>
    </ProductCardGroupContainer>
  );
}

const ProductCardGroupContainer = styled.div`
  padding-left: 200px;
  margin-bottom: 50px;
`;

const ProductCardGroup = styled.div`
  display: flex;
  align-items: center;
`;
