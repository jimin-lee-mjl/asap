import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import {
  CheckCircleOutlined,
  PushpinOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  controlModal,
  showModal,
  addToLikes,
  undoLikes,
} from '../../actions/productsActions';
import ImageUrl from '../../url/imageUrl';

export default function ProductCard({ categoryKey }) {
  const products = useSelector((state) => state.setProductsReducer.products);
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const selectedProductIdList = useSelector(
    (state) => state.selectProductReducer.selectedProductId,
  );
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);

  const dispatch = useDispatch();

  const handleClickCheck = (e) => {
    e.stopPropagation();
    const selectedProductId = e.currentTarget.getAttribute('asin');
    console.log(selectedProductId);
    dispatch(selectProduct(selectedProductId));
    message.success('Check!', 0.5);
    console.log(selectedProductIdList);
  };

  const handleClickLikes = (e) => {
    e.stopPropagation();
    const likeProductId = e.currentTarget.getAttribute('asin');
    console.log(likeProductId);
    dispatch(addToLikes([likeProductId]));
    message.success('Successfully added to your likes', 0.5);
  };

  const handleClickUndoLikes = (e) => {
    e.stopPropagation();
    const undoLikesProductId = e.currentTarget.getAttribute('asin');
    console.log(undoLikesProductId);
    dispatch(undoLikes([undoLikesProductId]));
    message.info('Successfully removed from your likes', 0.5);
  };

  const likesOrNot = (asin) => {
    if (likeProducts.includes(asin)) {
      return (
        <HeartFilled
          asin={asin}
          style={{ fontSize: '30px', color: '#ff6f00' }}
          onClick={handleClickUndoLikes}
        />
      );
    } else {
      return (
        <HeartOutlined
          asin={asin}
          style={{ fontSize: '30px', color: 'gray' }}
          onClick={handleClickLikes}
        />
      );
    }
  };

  const renderProductCard = products[categoryKey].map((product) => {
    const { asin, price, title } = product;
    const image = ImageUrl(asin);
    return (
      <CardContainer
        key={asin}
        $colorbyselect={
          selectedProductIdList.includes(asin) ? '#ff6f00' : '#f0f0f0'
        }
      >
        <Card
          hoverable
          style={{ width: 190 }}
          cover={
            <img
              alt="No Image"
              src={image}
              style={{
                height: 200,
                padding: 10,
                width: '90%',
                margin: '0 auto',
              }}
            />
          }
          onClick={(e) => {
            dispatch(showModal(asin));
          }}
        >
          <CardBody>
            <CardContent>
              <ProductTitle>{title}</ProductTitle>
              <ProductPrice>$ {price}</ProductPrice>
            </CardContent>
            <CardIcons>
              <CheckCircleOutlined
                asin={asin}
                style={{
                  marginRight: 40,
                  color: selectedProductIdList.includes(asin)
                    ? '#ff6f00'
                    : 'gray',
                }}
                onClick={handleClickCheck}
              />
              {likesOrNot(asin)}
            </CardIcons>
          </CardBody>
        </Card>
      </CardContainer>
    );
  });

  return <>{renderProductCard}</>;
}

const CardContainer = styled.div`
  margin: 0.5rem;
  .ant-card {
    height: 400px;
    border: 0.4rem solid;
    border-color: ${(props) => props.$colorbyselect};
    border-radius: 2rem;
  }
  .ant-card-body {
    height: 200px;
    padding: 10px;
  }
  .ant-card-cover {
    border-bottom: 0.3rem solid #f0f0f0;
  }
`;

const CardIcons = styled.div`
  margin-top: 20px;
  font-size: 30px;
`;

const CardBody = styled.div`
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
