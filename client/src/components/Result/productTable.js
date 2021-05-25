import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography } from 'antd';
import ProductCard from './productCard';
import axios from 'axios';
import styled from 'styled-components';

export default function ProductTable() {
  const { Title } = Typography;
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const likesApiUrl = '';
  const basketApiUrl = '';
  const purchaseApiUrl = '';

  const columns = [
    {
      title: 'Image',
      dataIndex: 'ImageURL',
      render: (theImageURL) => (
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style={{ width: 150, height: 150 }}
        />
      ),
      width: 80,
    },
    {
      title: '상품명',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '가격',
      dataIndex: 'price',
      width: 150,
    },
  ];

  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `Men's Cotton Performance Short Sleeve T-Shirt ${i}`,
      price: '24,000원',
    });
  }

  const rowSelection = {
    // selectedRowKeys: [0],
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      setSelectedProduct(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };

  const handleClickLikes = useCallback(async () => {
    console.log('handleClickLikes');
    console.log('selectedProduct: ', selectedProduct);
    await axios
      .put(likesApiUrl, {
        data: selectedProduct,
      })
      .then(function (response) {
        console.log('response: ', response);
      })
      .catch(function (error) {})
      .then(function () {});
  }, [likesApiUrl, selectedProduct]);

  const handleClickBasket = useCallback(async () => {
    console.log('handleClickBasket');
    console.log('selectedProduct: ', selectedProduct);
    await axios
      .put(basketApiUrl, {
        data: selectedProduct,
      })
      .then(function (response) {
        console.log('response: ', response);
      })
      .catch(function (error) {})
      .then(function () {});
  }, [basketApiUrl, selectedProduct]);

  const handleClickPurchase = useCallback(async () => {
    console.log('handleClickPurchase');
    console.log('selectedProduct: ', selectedProduct);
    await axios
      .put(purchaseApiUrl, {
        data: selectedProduct,
      })
      .then(function (response) {
        console.log('response: ', response);
      })
      .catch(function (error) {})
      .then(function () {});
  }, [purchaseApiUrl, selectedProduct]);

  // 총 가격 표시
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const CalTotalPrice = useEffect(() => {
    var sumPrice = 0;
    var price = 0;
    var regex = /[^0-9]/g;

    selectedProduct.map((product) => {
      price = Number(product.price.replace(regex, ''));
      console.log(price);
      sumPrice += price;
      console.log(sumPrice);
    });

    sumPrice = numberWithCommas(sumPrice);
    console.log(sumPrice);
    setTotalPrice(sumPrice);
  }, [selectedProduct, totalPrice]);

  return (
    <div>
      <ProductListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        style={{
          width: '1000px',
        }}
      />
      <TableFooter>
        <div>
          <Title>
            총 {selectedProduct.length}개 상품 선택 &nbsp;&nbsp;&nbsp; &nbsp;총{' '}
            {totalPrice}원
          </Title>
        </div>
        <ButtonGroup>
          <Button
            size="large"
            onClick={() => {
              handleClickLikes();
            }}
          >
            선택한 상품 찜하기
          </Button>
          <Button
            size="large"
            onClick={() => {
              handleClickBasket();
            }}
          >
            선택한 상품 장바구니에 담기
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              handleClickPurchase();
            }}
          >
            선택한 상품 구매하기
          </Button>
        </ButtonGroup>
      </TableFooter>
    </div>
  );
}

const ProductListTable = styled(Table)`
  .ant-pagination {
    display: none;
  }
  .ant-table-thead tr th {
    color: white;
    background: #1890ff;
    text-align: center;
  }

  .ant-table table {
    text-align: center;
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
