import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct } from '../../actions/productsActions';
import { Link } from 'react-router-dom';

export default function ProductTable() {
  const { Title } = Typography;
  const [checkedProduct, setSelectedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );

  const likesApiUrl = '';
  const basketApiUrl = '';
  const purchaseApiUrl = '';

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

  const data = [];

  Object.entries(selectedProducts).map(([category, productList]) => {
    console.log('selectedProductsList', productList);
    productList.map((product) => {
      data.push({
        key: product.id,
        ImageURL: product.image,
        name: product.title,
        price: product.price,
      });
    });
  });

  const rowSelection = {
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
    console.log('checkedProduct: ', checkedProduct);
    // dispatch(selectProduct(checkedProduct));
  }, [likesApiUrl, checkedProduct]);

  const handleClickBasket = useCallback(async () => {
    console.log('handleClickBasket');
    console.log('checkedProduct: ', checkedProduct);

    // post 코드
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const body = JSON.stringify({
    //   userId: 5,
    //   date: '2020 - 02 - 03',
    //   products: [
    //     { productId: 5, quantity: 1 },
    //     { productId: 1, quantity: 5 },
    //   ],
    // });

    // axios
    //   .post('https://fakestoreapi.com/carts', body, config)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [basketApiUrl, checkedProduct]);

  const handleClickPurchase = useCallback(async () => {
    console.log('handleClickPurchase');
    console.log('checkedProduct: ', checkedProduct);

    // 구매 api post 코드 추가
  }, [purchaseApiUrl, checkedProduct]);

  // 총 가격 표시
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }

  const CalTotalPrice = useEffect(() => {
    var sumPrice = 0;
    var price = 0;
    var regex = /[^0-9]/g;

    checkedProduct.map((product) => {
      // price = Number(product.price.replace(regex, ''));
      price = Number(product.price);
      console.log(price);
      sumPrice += price;
      console.log(sumPrice);
    });

    // sumPrice = numberWithCommas(sumPrice);
    // console.log(sumPrice);
    setTotalPrice(sumPrice);
  }, [checkedProduct, totalPrice]);

  return (
    <div>
      <ProductListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ y: 720 }}
        style={{
          width: '1000px',
        }}
      />
      <TableFooter>
        <div>
          <Title>
            총 {checkedProduct.length}개 상품 선택 &nbsp;&nbsp;&nbsp; &nbsp;총{' '}
            {totalPrice.toFixed(2)}원
          </Title>
        </div>
        <ButtonGroup>
          <Link to="/recommend" style={{ float: 'left' }}>
            <Button type="primary" size="large">
              다시 선택하기
            </Button>
          </Link>
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
