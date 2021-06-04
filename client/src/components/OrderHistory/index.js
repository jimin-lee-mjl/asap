import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { setOrderDetails } from '../../actions/productsActions';
import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import OrderInfo from './orderInfo';

export default function OrderHistory() {
  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);

  const { orderId } = useParams();
  const orderDetails = useSelector(
    (state) => state.setOrderDetailsReducer.orderDetails,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderDetails(orderId));
  }, []);

  const columns = [
    {
      title: '상품 이미지',
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
      title: '상품명',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: '가격',
      dataIndex: 'price',
      width: 80,
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
          onRow={(
            record,

            index,
          ) => ({
            onClick: () => {
              console.log(record, index, 'clicked!!');
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
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
    background: #1890ff;
    text-align: center;
  }

  .ant-table table {
    text-align: center;
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
