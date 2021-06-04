import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  showModal,
} from '../../actions/productsActions';
import { Link } from 'react-router-dom';

export default function ProductTable() {
  const history = useHistory();

  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const modal = useSelector((state) => state.showModalReducer.modal);

  const likesApiUrl = '';
  const basketApiUrl = '';
  const purchaseApiUrl = '';

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
          <Button
            size="small"
            style={{ fontSize: 'x-small', marginBottom: '10px' }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('ADD TO CART!', record);
            }}
          >
            ADD TO CART
          </Button>
          <Button
            size="small"
            style={{ fontSize: 'xx-small' }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('ADD TO LIKES!', record);
            }}
          >
            ADD TO LIKES
          </Button>
        </div>
      ),
      width: '10%',
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
      setCheckedProduct(selectedRows);
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
    // try {
    //   dispatch(likeProduct(checkedProduct));
    // } catch (e) {
    //   alert('이미 찜한 상품입니다.');
    // }
    message.success('찜 목록에 저장되었습니다', 0.5);
    // dispatch(selectProduct(checkedProduct));
  }, [likesApiUrl, checkedProduct]);

  const handleClickBasket = useCallback(async () => {
    console.log('handleClickBasket');
    console.log('checkedProduct: ', checkedProduct);
    message.success('상품을 장바구니에 담았습니다.', 0.5);
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
        onRow={(record, index) => ({
          onClick: () => {
            console.log(record, index, 'clicked!!');
            dispatch(showModal(record.key));
          },
        })}
      />
      <TableFooter>
        <div>
          <Title>
            Subtotal ({checkedProduct.length}{' '}
            {checkedProduct.length <= 1 ? 'item' : 'items'}): $
            {totalPrice.toFixed(2)}
          </Title>
        </div>
        <ButtonGroup>
          <Link to="/recommend" style={{ float: 'left' }}>
            <Button type="primary" size="large">
              Previous
            </Button>
          </Link>
          <Button
            size="large"
            onClick={() => {
              handleClickLikes();
            }}
          >
            ADD TO LIKES
          </Button>
          <Button
            size="large"
            onClick={() => {
              handleClickBasket();
            }}
          >
            ADD TO CART
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              handleClickPurchase();
              history.push('/payment');
            }}
          >
            ORDER NOW
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
