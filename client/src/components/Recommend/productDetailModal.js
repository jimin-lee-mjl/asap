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
import {
  HeartOutlined,
  HeartFilled,
  CheckOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  showModal,
  addToLikes,
  undoLikes,
} from '../../actions/productsActions';
import { setModal, controlModal } from '../../actions/productsActions';

export default function ProductDetailModal({ productInfo }) {
  const { Title } = Typography;
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const selectedProductIdList = useSelector(
    (state) => state.selectProductReducer.selectedProductId,
  );
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);
  const modal = useSelector((state) => state.showModalReducer.modal);

  const dispatch = useDispatch();

  const handleClickCheck = (e) => {
    e.stopPropagation();
    const selectedProductId = e.currentTarget.getAttribute('asin');
    console.log(selectedProductId);
    dispatch(selectProduct(selectedProductId));
    message.success('상품이 선택되었습니다.', 0.5);
    console.log(selectedProductId);
  };

  const handleClickLikes = (e) => {
    e.stopPropagation();
    const likeProductId = e.currentTarget.getAttribute('asin');
    console.log(likeProductId);
    dispatch(addToLikes([likeProductId]));
    message.success('찜 목록에 저장되었습니다', 0.5);
  };

  const handleClickUndoLikes = (e) => {
    e.stopPropagation();
    const undoLikesProductId = e.currentTarget.getAttribute('asin');
    console.log(undoLikesProductId);
    dispatch(undoLikes([undoLikesProductId]));
    message.success('찜이 해제되었습니다', 0.5);
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

  const renderSelectButton = (id) => {
    console.log(id);
    console.log(selectedProductIdList);
    if (selectedProductIdList.includes(String(id))) {
      return (
        <button
          className="select-btn"
          asin={id}
          onClick={handleClickCheck}
          style={{
            background: '#ff6f00',
            color: 'white',
          }}
        >
          <CheckOutlined />
          &nbsp; Selected item
        </button>
      );
    } else {
      return (
        <button
          className="select-btn"
          asin={id}
          onClick={handleClickCheck}
          style={{
            background: 'white',
            color: '#ff6f00',
          }}
        >
          &nbsp; Select this item
        </button>
      );
    }
  };

  return (
    <DetailModal
      centered
      visible={modal.key > 0}
      onCancel={() => dispatch(showModal(0))}
      width={'50%'}
      maskStyle={{ background: 'white' }}
      footer={[
        <div>{renderSelectButton(modal.data.id)}</div>,
        <div>{likesOrNot(modal.data.id)}</div>,
      ]}
    >
      <ProductDetailDiv>
        <Col span={11} style={{ textAlign: 'center', paddingRight: '2rem' }}>
          <img
            alt={modal.data.title}
            src={modal.data.image}
            style={{ width: 300, height: 400 }}
          />
        </Col>
        <ProductDescriptionCol span={11}>
          <Title level={2}>{modal.data.title}</Title>
          <Title level={4}>PRICE</Title>
          <p style={{ paddingLeft: '1rem', fontSize: '2rem' }}>
            $ {modal.data.price}
          </p>

          <KeywordContainer>
            <KeywordDiv>
              <Title level={5}>긍정 키워드</Title>
              <div>
                <Tag color="green">편함</Tag>
                <Tag color="cyan">깨끗함</Tag>
                <Tag color="blue">가성비</Tag>
                <Tag color="geekblue">빠른건조</Tag>
                <Tag color="purple">무난</Tag>
              </div>
            </KeywordDiv>
            <KeywordDiv>
              <Title level={5}>부정 키워드</Title>
              <div>
                <Tag color="magenta">실밥마감</Tag>
                <Tag color="red">무거움</Tag>
                <Tag color="volcano">애매</Tag>
                <Tag color="orange">목늘어남</Tag>
                <Tag color="gold">비쌈</Tag>
              </div>
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

  .ant-modal-content .ant-modal-footer {
    text-align: left;
    padding-left: 90px;
    display: flex;
    align-items: center;
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

  .ant-modal-footer div .select-btn {
    border: 0.3rem solid #ff6f00;
    border-radius: 2rem;
    line-height: 2;
    margin-right: 1rem;
    padding-inline: 2rem;
    width: 20rem;
  }

  .ant-modal-footer div .like-btn {
    border: 0.3rem solid #ff6f00;
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
  height: 60%;
`;

const ProductDescriptionCol = styled(Col)``;

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

// const Button = styled.button`
//   background: #ff6f00;
//   width: 8rem;
//   height: 4rem;
//   border: 0.1rem solid #ff6f00;
//   border-radius: 0.5rem;
//   font-size: 1.7rem;
//   color: white;
//   margin: 0 3vw;
//   text-align: center;
//   vertical-align: middle;
//   display: table-cell;
//   line-height: 2;
//   margin: 5px 0;

//   :hover {
//     box-shadow: 2px 4px 8px #c4c4c4;
//   }
// `;

// const OutLinedButton = styled(Button)`
//   background: #fff;
//   color: #ff6f00;
// `;
