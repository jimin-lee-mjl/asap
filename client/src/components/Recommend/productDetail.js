import React, { useState, useContext } from 'react';
import { Col, message, Typography, Modal, Button } from 'antd';
import { ProductContext } from './UserContext';

export default function ProductDetail() {
  const { Title } = Typography;
  const { visible, setVisible } = useContext(ProductContext);

  const handleClickCheck = (e) => {
    e.stopPropagation();
    message.success('This is a normal message', 0.5);
  };

  const handleClickPushpin = (e) => {
    e.stopPropagation();
    message.success('찜하기', 0.5);
  };

  return (
    <div>
      <Modal
        title="상품 상세"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={1200}
        footer={[
          <Button
            id="check-btn"
            key="submit"
            type="primary"
            onClick={handleClickCheck}
          >
            이 상품 선택하기
          </Button>,
          <Button
            id="pushpin-btn"
            key="submit"
            type="primary"
            onClick={handleClickPushpin}
          >
            찜하기
          </Button>,
        ]}
      >
        <div
          className="product-detail"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Col span={11}>
            <div className="product-detail-img">
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
          </Col>
          <Col span={13}>
            <div className="product-detail-description">
              <Title level={2}>
                Men's Cotton Performance Short Sleeve T-Shirt
              </Title>
              <Title level={3}>가격: 24,000 원</Title>
              <Title level={3}>긍정 키워드</Title>
              <Title level={3}>부정 키워드</Title>
            </div>
          </Col>
        </div>
      </Modal>
    </div>
  );
}
