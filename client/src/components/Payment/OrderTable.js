import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

export default function OrderTable({ totalPrice }) {
  const columns = [
    {
      title: 'Code',
      dataIndex: 'key',
      width: '20%',
    },
    {
      title: 'Image',
      dataIndex: 'ImageURL',
      render: (url) => (
        <img alt={url} src={url} style={{ width: '80%', height: 'auto' }} />
      ),
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      className: 'column-price',
      dataIndex: 'price',
      align: 'right',
      width: '15%',
    },
  ];

  const order = useSelector((state) => state.orderReducer.orderList);

  return (
    <div>
      <h1>Your Order</h1>
      <br />
      <Table
        columns={columns}
        dataSource={order}
        bordered
        footer={() => `Total : $${totalPrice}`}
        pagination={false}
        scroll={{ y: 200 }}
        style={{ marginBottom: '5rem' }}
      />
    </div>
  );
}
