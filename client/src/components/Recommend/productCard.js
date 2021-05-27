import React, { useState, useContext } from 'react';
import { Card, message } from 'antd';
import { CheckCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { ProductContext } from './UserContext';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct } from '../../actions/productsActions';

export default function ProductCard({ categoryKey }) {
  const { visible, setVisible } = useContext(ProductContext);
  const { Meta } = Card;

  const products = useSelector((state) => state.setProductsReducer.products);
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const dispatch = useDispatch();

  const handleClickCheck = (e) => {
    e.stopPropagation();
    console.log(e.currentTarget.getAttribute('productId'));
    const selectedProductId = e.currentTarget.getAttribute('productId');
    dispatch(selectProduct(selectedProductId));
    message.success('This is a normal message', 0.5);
  };

  const handleClickPushpin = (e) => {
    e.stopPropagation();
    console.log(e.currentTarget.getAttribute('productId'));
    message.success('찜하기', 0.5);
  };

  console.log(categoryKey);
  const renderProductCard = products[categoryKey].map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <CardContainer key={id}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt={title} src={image} />}
          onClick={() => setVisible(true)}
        >
          <Meta
            style={{ whiteSpace: 'none' }}
            title={title}
            description={price}
          />
          <CardIcons>
            <CheckCircleOutlined
              productId={id}
              style={{ marginRight: 40 }}
              onClick={handleClickCheck}
            />
            <PushpinOutlined productId={id} onClick={handleClickPushpin} />
          </CardIcons>
        </Card>
      </CardContainer>
    );
  });

  return <>{renderProductCard}</>;
}

const CardContainer = styled.div`
  margin: 10px;
`;

const CardIcons = styled.div`
  margin-top: 20px;
  font-size: 30px;
`;
