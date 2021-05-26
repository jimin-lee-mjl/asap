import React, { useState, useContext } from 'react';
import { Card, message } from 'antd';
import { CheckCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { ProductContext } from './UserContext';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function ProductCard() {
  const { visible, setVisible } = useContext(ProductContext);
  const { Meta } = Card;

  const products = useSelector((state) => state.setProductsReducer.products);

  const handleClickCheck = (e) => {
    e.stopPropagation();
    message.success('This is a normal message', 0.5);
  };

  const handleClickPushpin = (e) => {
    e.stopPropagation();
    message.success('찜하기', 0.5);
  };

  const renderList = products.map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <CardContainer>
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
              style={{ marginRight: 40 }}
              onClick={handleClickCheck}
            />
            <PushpinOutlined onClick={handleClickPushpin} />
          </CardIcons>
        </Card>
      </CardContainer>
    );
  });

  return <>{renderList}</>;
}

const CardContainer = styled.div`
  margin: 10px;
`;

const CardIcons = styled.div`
  margin-top: 20px;
  font-size: 30px;
`;
