import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  setOrderDetails,
  showModal,
  addToLikes,
  undoLikes,
  loadLikes,
  loadCart,
  addToCart,
  undoCart,
} from '../../actions/productsActions';
import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ProductDetailModal from './productDetailModal';
// import OrderInfo from './orderInfo';
import HeaderComponent from '../Header';

export default function OrderHistory() {
  const authToken = localStorage.getItem('token');

  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);

  const { orderId } = useParams();
  const orderDetails = useSelector(
    (state) => state.setOrderDetailsReducer.orderDetails,
  );
  const modal = useSelector((state) => state.showModalReducer.modal);
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderDetails(orderId));
    dispatch(loadCart());
    dispatch(loadLikes());
  }, []);

  const handleClickCart = (e) => {
    e.stopPropagation();
    const addCartProductId = e.currentTarget.getAttribute('asin');
    console.log(addCartProductId);
    dispatch(addToCart([addCartProductId]));
    message.success('add to cart', 0.5);
  };

  const handleClickUndoCart = (e) => {
    e.stopPropagation();
    const undoCartProductId = e.currentTarget.getAttribute('asin');
    console.log(undoCartProductId);
    dispatch(undoCart([undoCartProductId]));
    message.success('찜이 해제되었습니다', 0.5);
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

  const columns = [
    {
      title: '',
      dataIndex: 'ImageURL',
      render: (theImageURL) => (
        <img
          alt={theImageURL}
          src={theImageURL}
          style={{ width: 150, height: 150 }}
        />
      ),
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 80,
    },
    {
      title: '',
      dataIndex: 'action',
      render: (text, record) => (
        <div
          style={{
            fontSize: 'xx-small',
            paddingRight: '10px',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {cartProducts.includes(record.key) ? (
            <ShoppingCartOutlined
              style={{ fontSize: '4rem', color: '#ff6f00' }}
              asin={record.key}
              onClick={handleClickUndoCart}
            />
          ) : (
            <ShoppingCartOutlined
              style={{ fontSize: '4rem', color: 'grey' }}
              asin={record.key}
              onClick={handleClickCart}
            />
          )}
          {likeProducts.includes(record.key) ? (
            <HeartFilled
              style={{ fontSize: '30px', color: '#ff6f00' }}
              asin={record.key}
              onClick={handleClickUndoLikes}
            />
          ) : (
            <HeartOutlined
              style={{ fontSize: '30px', color: '#ff6f00' }}
              asin={record.key}
              onClick={handleClickLikes}
            />
          )}
        </div>
      ),
      width: '10%',
    },
  ];

  const orderedItemsTableData = [];

  console.log(orderDetails);
  if (orderDetails) {
    orderDetails.map((orderedItem) => {
      console.log('orderedItem:', orderedItem);
      orderedItemsTableData.push({
        key: orderedItem.id,
        ImageURL: orderedItem.image,
        name: orderedItem.title,
        price: orderedItem.price,
      });
    });
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      setCheckedProduct(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };

  return (
    <>
      {authToken ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <Container>
        <div style={{ alignSelf: 'start' }}>
          <h1>Order Details</h1>
        </div>
        <div>
          <div style={{ textAlign: 'left' }}>2021-06-01 </div>
          <CartListTable
            columns={columns}
            dataSource={orderedItemsTableData}
            scroll={{ y: 400 }}
            onRow={(record, index) => ({
              onClick: () => {
                console.log(record, index, 'clicked!!');
                dispatch(showModal(record.key));
              },
            })}
          />
          <TableFooter>
            <h1>Total ${}</h1>
          </TableFooter>
        </div>
        <DeliveryInfoContainer>
          <h1>Delivery Info</h1>
          <DeliveryInfo>
            <InfoTitleDiv>
              <p>Name</p>
              <p>Email</p>
              <p>Shipping Address</p>
              <p>Postal Code</p>
            </InfoTitleDiv>
            <InfoContentDiv>
              <p>Kyunglim Khang</p>
              <p>Kyunglim.Khang@gmail.com</p>
              <p>157, Hwarang-ro, Seongbuk-gu, Seoul, Republic of Korea</p>
              <p>02773</p>
            </InfoContentDiv>
          </DeliveryInfo>
        </DeliveryInfoContainer>
        <ProductDetailModal />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 100px;
`;

const CartListTable = styled(Table)`
  .ant-pagination {
    display: none;
  }
  .ant-table-wrapper {
    border-left: solid 1px #dfe4ea;
    border-bottom: solid 0.1px #dfe4ea;
  }
  thead .ant-table-cell {
    font-size: 20px;
    font-weight: bold;
  }

  .ant-table-thead tr th {
    color: white;
    background: #ff6f00;
  }

  .ant-table table {
    text-align: left;
  }

  .ant-table-tbody td {
    font-size: 20px;
  }
`;

const TableFooter = styled.div`
  text-align: right;
  margin: 20px;
`;
const ButtonGroup = styled.div`
  button {
    margin-left: 5px;
  }
`;

const DeliveryInfoContainer = styled.div`
  width: 100%;
  text-align: left;
`;

const DeliveryInfo = styled.div`
  display: flex;
  border: solid 1px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
`;

const InfoTitleDiv = styled.div`
  margin-left: 40px;
  font-weight: bold;
}`;
const InfoContentDiv = styled.div`
  margin-left: 40px;
`;

const InfoTitle = styled.div``;

const InfoContent = styled.div``;
