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
        keywordList.push(<KeywordTag>{keyword}</KeywordTag>);
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
          <ProductTitle>{modal.data.title}</ProductTitle>
          <Title
            level={4}
            style={{ color: 'darkolivegreen', marginTop: '1rem' }}
          >
            PRICE
          </Title>
          <p style={{ paddingLeft: '1rem', fontSize: '2rem' }}>
            $ {modal.data.price}
          </p>
          <KeywordCol>
            <Title level={4} style={{ color: 'darkolivegreen' }}>
              Keyword
            </Title>
            <KeywordContainer>
              <KeywordDiv>
                <div>{renderKeywords(modal.data.keywords)}</div>
              </KeywordDiv>
            </KeywordContainer>
          </KeywordCol>
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

//productdetail
const ProductDetailDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductDescriptionCol = styled(Col)`
  height: 600px;
`;

const ProductTitle = styled.div`
  font-weight: bold;
  font-size: 2rem;

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

  :hover {
    overflow: visible;
  }
`;

//keyword
const KeywordCol = styled.div``;

const KeywordContainer = styled.div`
  border: solid 1px darkolivegreen;
  padding: 20px;
  margin-right: 10px;
  border-radius: 1rem;
`;

const KeywordDiv = styled.div`
  margin-bottom: 15px;
`;

const KeywordTag = styled(Tag)`
  line-height: 2;
  font-size: 1.5rem;
  margin: 0.3rem;
  background: beige;
  border-radius: 0.5rem;
`;
