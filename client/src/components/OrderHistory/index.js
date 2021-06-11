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
import HeaderComponent from '../Header';
import ImageUrl from '../../url/imageUrl';

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
    message.success('Successfully added to your cart', 0.5);
  };

  const handleClickUndoCart = (e) => {
    e.stopPropagation();
    const undoCartProductId = e.currentTarget.getAttribute('asin');
    console.log(undoCartProductId);
    dispatch(undoCart([undoCartProductId]));
    message.info('Successfully removed from your cart', 0.5);
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

  const columns = [
    {
      title: '',
      dataIndex: 'ImageURL',
      render: (theImageURL) => (
        <img
          alt={'No Image'}
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
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          {cartProducts.includes(record.key) ? (
            <ShoppingCartOutlined
              style={{ fontSize: '3.8rem', color: '#ff6f00' }}
              asin={record.key}
              onClick={handleClickUndoCart}
            />
          ) : (
            <ShoppingCartOutlined
              style={{ fontSize: '3.8rem', color: 'darkgray' }}
              asin={record.key}
              onClick={handleClickCart}
            />
          )}
          <div
            style={{
              fontSize: '3rem',
              paddingLeft: '0.6rem',
            }}
          >
            {likeProducts.includes(record.key) ? (
              <HeartFilled
                style={{ color: '#ff6f00' }}
                asin={record.key}
                onClick={handleClickUndoLikes}
              />
            ) : (
              <HeartOutlined
                style={{ color: 'darkgray' }}
                asin={record.key}
                onClick={handleClickLikes}
              />
            )}
          </div>
        </div>
      ),
      width: '10%',
    },
  ];

  const orderedItemsTableData = [];

  console.log(orderDetails);
  if (orderDetails['item_info']) {
    orderDetails['item_info'].map((orderedItem) => {
      orderedItemsTableData.push({
        key: orderedItem.asin,
        ImageURL: ImageUrl(orderedItem.asin),
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
      <RootContainer>
        <div style={{ alignSelf: 'start' }}>
          <h1>Order Details</h1>
        </div>
        <OrderInfoContainer>
          <div style={{ textAlign: 'left' }}>
            {orderDetails['order_detail'].ordered_at
              ? orderDetails['order_detail'].ordered_at.slice(0, 10)
              : ''}
          </div>
          <OrderListTable
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
            <h1>Total $ {orderDetails['order_detail'].total_price}</h1>
          </TableFooter>
        </OrderInfoContainer>
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
              <p>
                {orderDetails['order_detail'].first_name}
                &nbsp;
                {orderDetails['order_detail'].last_name}
              </p>
              <p>{orderDetails['order_detail'].email}</p>
              <p>{orderDetails['order_detail'].address}</p>
              <p>{orderDetails['order_detail'].postal_code}</p>
            </InfoContentDiv>
          </DeliveryInfo>
        </DeliveryInfoContainer>
        <ProductDetailModal />
      </RootContainer>
    </>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: auto;
  margin-top: 13rem;
`;

const OrderInfoContainer = styled.div`
  width: 100%;
`;
const OrderListTable = styled(Table)`
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
  //thead css
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 1rem;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 1rem;
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
  font-size: 1.5rem;
  border-radius: 2rem;
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
