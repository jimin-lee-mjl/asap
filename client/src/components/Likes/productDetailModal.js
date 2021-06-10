import React, { useState, useEffect } from 'react';
import {
  CloseOutlined,
  Col,
  message,
  Typography,
  Modal,
  Button,
  Tag,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  showModal,
  addToCart,
  undoCart,
} from '../../actions/productsActions';
import { setModal, controlModal } from '../../actions/productsActions';
import ImageUrl from '../../url/imageUrl';
import { test_keyword } from '../../actions/userSelect';

export default function ProductDetailModal({ productInfo }) {
  const { Title } = Typography;
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const modal = useSelector((state) => state.showModalReducer.modal);
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);

  const dispatch = useDispatch();

  const handleClickCart = (e) => {
    e.stopPropagation();
    const addCartProductId = e.currentTarget.getAttribute('asin');
    console.log(addCartProductId);
    dispatch(addToCart([addCartProductId]));
    message.success('Successfully added to your cart', 0.5);
  };

  const handleClickUndoCart = (e) => {
    e.stopPropagation();
    const undoCartProductId = e.currentTarget.getAttribute('asin');
    console.log(undoCartProductId);
    dispatch(undoCart([undoCartProductId]));
    message.info('Successfully removed from your cart', 0.5);
  };

  const InCartOrNot = (id) => {
    if (cartProducts.includes(id)) {
      return (
        <button
          className="cart-btn"
          asin={id}
          onClick={handleClickUndoCart}
          style={{
            background: '#ff6f00',
            color: 'white',
          }}
        >
          &nbsp; Already In Cart
        </button>
      );
    } else {
      return (
        <button
          className="cart-btn"
          asin={id}
          onClick={handleClickCart}
          style={{
            background: 'white',
            color: '#ff6f00',
          }}
        >
          <ShoppingCartOutlined style={{ color: '#ff6f00' }} />
          &nbsp; Add To Cart
        </button>
      );
    }
  };

  const renderKeywords = (keywordNumList) => {
    const keywordList = [];
    if (keywordNumList) {
      keywordNumList.map((keyword) => {
        keywordList.push(<Tag color="green">{test_keyword[keyword]}</Tag>);
      });
    }
    return keywordList;
  };

  return (
    <DetailModal
      title="Details"
      centered
      visible={modal.key !== 0}
      onCancel={() => dispatch(showModal(0))}
      width={'50%'}
      maskStyle={{ background: 'white' }}
      footer={[<div>{InCartOrNot(modal.data.asin)}</div>]}
    >
      <ProductDetailDiv>
        <Col
          span={11}
          style={{ textAlign: 'center', paddingRight: '2rem', height: '100%' }}
        >
          <img
            alt={'No Image'}
            src={ImageUrl(modal.data.asin)}
            style={{ width: 300, height: 400 }}
          />
        </Col>
        <ProductDescriptionCol span={11} style={{ height: '100%' }}>
          <Title level={2}>{modal.data.title}</Title>
          <Title level={4}>PRICE</Title>
          <p style={{ paddingLeft: '1rem', fontSize: '2rem' }}>
            $ {modal.data.price}
          </p>
          <KeywordContainer>
            <KeywordDiv>
              <Title level={5}>키워드</Title>
              <div>{renderKeywords(modal.data.keywords)}</div>
            </KeywordDiv>
          </KeywordContainer>
        </ProductDescriptionCol>
      </ProductDetailDiv>
    </DetailModal>
  );
}

const DetailModal = styled(Modal)`
  .ant-modal-content {
    height: 60rem;
  }
  .ant-modal-content .ant-modal-body {
    height: 80%;
  }
  .ant-modal-content .ant-modal-footer {
    text-align: left;
    padding-right: 2rem;
    display: flex;
    align-items: center;
    height: 10%;
    justify-content: flex-end;
  }

  .ant-modal-footer .ant-btn {
    width: 150px;
    height: 50px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .ant-modal-footer div {
    font-size: 1.8rem;
  }

  .ant-modal-footer div .cart-btn {
    border: 0.2rem solid #ff6f00;
    border-radius: 2rem;
    line-height: 2;
    margin-right: 1rem;
    padding-inline: 2rem;
    width: 20rem;
  }

  .ant-modal-footer div .like-btn {
    border: 0.2rem solid #ff6f00;
    border-radius: 2rem;
    line-height: 2;
    margin-right: 1rem;
    background: white;
    padding-inline: 1.5rem;
  }
`;
const ProductDetailDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductDescriptionCol = styled(Col)`
  height: 600px;
`;

const KeywordContainer = styled.div`
  margin-top: 50px;
  border: solid 1px gainsboro;
  padding: 20px;
  margin-right: 10px;
`;

const KeywordDiv = styled.div`
  margin-bottom: 15px;
`;

const PushpinButton = styled(Button)`
  margin-left: 30px;
`;
