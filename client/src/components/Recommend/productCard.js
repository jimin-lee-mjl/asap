import React, { useEffect, useState, useContext } from 'react';
import { Card, message } from 'antd';
import { CheckCircleOutlined, PushpinOutlined } from '@ant-design/icons';
import { ProductContext } from './UserContext';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  controlModal,
} from '../../actions/productsActions';
import ProductDetail from './productDetail';

export default function ProductCard({ categoryKey }) {
  const { Meta } = Card;
  const products = useSelector((state) => state.setProductsReducer.products);
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const likeProducts = useSelector(
    (state) => state.likeProductReducer.likeProducts,
  );
  const dispatch = useDispatch();

  const handleClickCheck = (e) => {
    e.stopPropagation();
    console.log(e.currentTarget.getAttribute('productId'));
    const selectedProductId = e.currentTarget.getAttribute('productId');
    dispatch(selectProduct(selectedProductId));
    message.success('상품이 선택되었습니다.', 0.5);
  };

  const handleClickPushpin = (e) => {
    e.stopPropagation();
    console.log(e.currentTarget.getAttribute('productId'));
    const likeProductId = e.currentTarget.getAttribute('productId');
    dispatch(likeProduct(likeProductId));
    message.success('찜 목록에 저장되었습니다', 0.5);
  };

  const renderProductCard = products[categoryKey].map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <CardContainer key={id}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt={title} src={image} />}
          onClick={() => dispatch(controlModal(id, true))}
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
        <ProductDetail productInfo={product} />
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
