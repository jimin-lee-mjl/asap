import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, likeProduct } from '../../actions/productsActions';
import { Link } from 'react-router-dom';

export default function CartList() {
  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartList = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart());
  }, []);

  const likesApiUrl = '';
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

  const CartListTableData = [];

  Object.entries(cartList).map((cart) => {
    const cartProduct = cart[1];
    console.log('cartProduct', cartProduct);
    CartListTableData.push({
      key: cartProduct.id,
      ImageURL: cartProduct.image,
      name: cartProduct.title,
      price: cartProduct.price,
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

  const handleClickDelete = useCallback(async () => {
    console.log('handleClickDelete');
    console.log('deleteProduct: ', checkedProduct);
    message.success('선택한 상품이 장바구니에서 삭제되었습니다. ', 0.5);
    console.log(cartList);
    // "Are you sure you want to delete?"alert 띄우기
    // delete api 코드
  }, [likesApiUrl, checkedProduct]);

  const handleClickLikes = useCallback(async () => {
    console.log('handleClickLikes');
    console.log('checkedProduct: ', checkedProduct);
    message.success('찜 목록에 저장되었습니다', 0.5);
    // dispatch(selectProduct(checkedProduct));
  }, [likesApiUrl, checkedProduct]);

  const CalTotalPrice = useEffect(() => {
    var sumPrice = 0;
    var price = 0;
    var regex = /[^0-9]/g;

    checkedProduct.map((product) => {
      price = Number(product.price);
      console.log(price);
      sumPrice += price;
      console.log(sumPrice);
    });

    setTotalPrice(sumPrice);
  }, [checkedProduct, totalPrice]);

  return (
    <div>
      <CartListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={CartListTableData}
        scroll={{ y: 720 }}
        style={{
          width: '1000px',
        }}
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
          <div style={{ float: 'left' }}>
            <Button
              size="large"
              onClick={() => {
                handleClickDelete();
              }}
            >
              DELETE SELECTED
            </Button>
          </div>
          <Button
            size="large"
            onClick={() => {
              handleClickLikes();
            }}
          >
            ADD TO LIKES
          </Button>
          <Link to="/purchase">
            <Button type="primary" size="large">
              ORDER NOW
            </Button>
          </Link>
        </ButtonGroup>
      </TableFooter>
    </div>
  );
}

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
