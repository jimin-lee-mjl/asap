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
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  showModal,
  addToLikes,
  undoLikes,
} from '../../actions/productsActions';
import { setModal, controlModal } from '../../actions/productsActions';
import ImageUrl from '../../url/imageUrl';
import { test_keyword } from '../../actions/userSelect';

export default function ProductDetailModal({ productInfo }) {
  const { Title } = Typography;
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);
  const modal = useSelector((state) => state.showModalReducer.modal);

  const dispatch = useDispatch();

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

  const likesOrNot = (id) => {
    if (likeProducts.includes(id)) {
      return (
        <button
          className="like-btn"
          asin={id}
          onClick={handleClickUndoLikes}
          style={{
            color: '#ff6f00',
            background: 'blanchedalmond',
            fontStyle: 'bold',
          }}
        >
          <HeartFilled />
          &nbsp; Like
        </button>
      );
    } else {
      return (
        <button
          className="like-btn"
          asin={id}
          onClick={handleClickLikes}
          style={{ color: '#ff6f00' }}
        >
          <HeartOutlined />
          &nbsp; Like
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
      footer={[<div>{likesOrNot(modal.data.asin)}</div>]}
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
