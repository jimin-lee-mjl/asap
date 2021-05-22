import React from 'react';
import { Card, Alert, message, Typography, Button } from 'antd';

export default function ProductCard() {
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      ></Card>
    </div>
  );
}
