import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import { CheckCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  controlModal,
  showModal,
} from '../../actions/productsActions';

export default function ProductCard({ categoryKey }) {
  const products = useSelector((state) => state.setProductsReducer.products);
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const selectedProductIdList = useSelector(
    (state) => state.selectProductReducer.selectedProductId,
  );
  const likeProducts = useSelector(
    (state) => state.likeProductReducer.likeProducts,
  );
  const dispatch = useDispatch();

  const handleClickCheck = (e) => {
    e.stopPropagation();
    const selectedProductId = e.currentTarget.getAttribute('asin');
    console.log(selectedProductId);
    dispatch(selectProduct(selectedProductId));
    message.success('상품이 선택되었습니다.', 0.5);
    console.log(selectedProductIdList);
  };

  const handleClickLikes = (e) => {
    e.stopPropagation();
    const likeProductId = e.currentTarget.getAttribute('asin');
    console.log(likeProductId);
    dispatch(likeProduct(likeProductId));
    message.success('찜 목록에 저장되었습니다', 0.5);
  };

  const renderProductCard = products[categoryKey].map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <CardContainer
        key={id}
        $colorbyselect={
          selectedProductIdList.includes(String(id)) ? '#ff6f00' : '#f0f0f0'
        }
      >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img alt={title} src={image} style={{ height: 300, padding: 10 }} />
          }
          onClick={(e) => {
            dispatch(showModal(id));
          }}
        >
          <CardBody>
            <CardContent>
              <ProductTitle>{title}</ProductTitle>
              <ProductPrice>$ {price}</ProductPrice>
            </CardContent>
            <CardIcons>
              <CheckCircleOutlined
                asin={id}
                style={{ marginRight: 40 }}
                onClick={handleClickCheck}
              />
              <PushpinOutlined asin={id} onClick={handleClickLikes} />
            </CardIcons>
          </CardBody>
        </Card>
      </CardContainer>
    );
  });

  return <>{renderProductCard}</>;
}

const CardContainer = styled.div`
  margin: 10px;
  .ant-card {
    height: 520px;
    border: 5px solid;
    border-color: ${(props) => props.$colorbyselect};
  }
  .ant-card-body {
    height: 210px;
    padding: 10px;
  }
  .ant-card-cover {
    border-bottom: 5px solid #f0f0f0;
  }
`;

const CardIcons = styled.div`
  margin-top: 20px;
  font-size: 30px;
`;

const CardBody = styled.div`
  margin: 10px;
  height: 100%;
`;

const CardContent = styled.div`
  text-align: left;
`;

const ProductTitle = styled.div`
  height: 80px;
  font-weight: bold;
  font-size: 17px;

  // 영역을 넘어가는 텍스트 처리
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;

  // ellipsis line
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  // webkit 엔진을 사용하지 않는 브라우저를 위한 속성.
  // height = line-height * line = 1.2em * 3 = 3.6em
  line-height: 1.2em;
  height: 3.6em;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
`;
