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

  const renderDeliveryInfo = () => {};

  return (
    <Container>
      <div style={{ width: '1000px' }}>
        <h1>Order Details</h1>
      </div>
      <div>
        <div>
          <CartListTable
            columns={columns}
            dataSource={orderedItemsTableData}
            scroll={{ y: 720 }}
            style={{
              width: '1000px',
            }}
            onRow={(record, index) => ({
              onClick: () => {
                console.log(record, index, 'clicked!!');
              },
            })}
          />
          <TableFooter>
            <h1>Total ${}</h1>
          </TableFooter>
        </div>
      </div>
      <div>{renderDeliveryInfo()}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
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
