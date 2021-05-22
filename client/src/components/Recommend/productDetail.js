import React, { useState, useContext } from 'react';
import { Col, message, Typography, Modal, Button, Tag } from 'antd';
import { ProductContext } from './UserContext';
import styled from 'styled-components';

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
      <DetailModal
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
          <PushpinButton
            key="submit"
            type="primary"
            onClick={handleClickPushpin}
          >
            찜하기
          </PushpinButton>,
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
              <KeywordDiv>
                <Title level={3}>긍정 키워드</Title>
                <div>
                  <Tag color="green">편함</Tag>
                  <Tag color="cyan">깨끗함</Tag>
                  <Tag color="blue">가성비</Tag>
                  <Tag color="geekblue">빠른건조</Tag>
                  <Tag color="purple">무난</Tag>
                </div>
              </KeywordDiv>
              <KeywordDiv>
                <Title level={3}>부정 키워드</Title>
                <div>
                  <Tag color="magenta">실밥마감</Tag>
                  <Tag color="red">무거움</Tag>
                  <Tag color="volcano">애매</Tag>
                  <Tag color="orange">목늘어남</Tag>
                  <Tag color="gold">비쌈</Tag>
                </div>
              </KeywordDiv>
            </div>
          </Col>
        </div>
      </DetailModal>
    </div>
  );
}

const KeywordDiv = styled.div`
  margin-bottom: 15px;
`;

const PushpinButton = styled(Button)`
  margin-left: 30px;
`;

const DetailModal = styled(Modal)`
  .ant-modal-content {
    height: 800px;
  }

  .product-detail-img img {
    height: 600px;
  }

  .product-detail-description {
    height: 600px;
  }

  .ant-modal-content .ant-modal-footer {
    text-align: left;
    padding-left: 90px;
  }

  .ant-modal-footer .ant-btn {
    width: 150px;
    height: 50px;
  }
`;
