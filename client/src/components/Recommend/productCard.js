import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Card, message } from 'antd';
import { CheckCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { ProductContext } from './UserContext';

export default function ProductCard() {
  const { visible, setVisible } = useContext(ProductContext);
  const { Meta } = Card;

  const handleClickCheck = (e) => {
    e.stopPropagation();
    message.success('This is a normal message', 0.5);
  };

  const handleClickPushpin = (e) => {
    e.stopPropagation();
    message.success('찜하기', 0.5);
  };

  return (
    <CardContainer>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
        onClick={() => setVisible(true)}
      >
        <Meta
          style={{ whiteSpace: 'none' }}
          title="Men's Cotton Performance Short Sleeve T-Shirt"
          description="24,000 원"
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
}

const CardContainer = styled.div`
  margin: 10px;
`;

const CardIcons = styled.div`
  margin-top: 20px;
  font-size: 30px;
`;
