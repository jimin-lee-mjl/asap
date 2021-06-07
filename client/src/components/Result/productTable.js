import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProduct,
  likeProduct,
  showModal,
  addToCart,
  orderRequest,
  addToLikes,
  undoLikes,
} from '../../actions/productsActions';
import { useHistory, Link } from 'react-router-dom';

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
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);

  const handleClickCart = (e) => {
    e.stopPropagation();
    const addCartProductId = e.currentTarget.getAttribute('asin');
    console.log(addCartProductId);
    dispatch(addToCart(addCartProductId));
    message.success('add to cart', 0.5);
  };

  const handleClickCartSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(addToCart(checkedIdList));
    message.success('add to cart', 0.5);
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

  const handleClickLikesSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(addToLikes(checkedIdList));
    message.success('add to likes', 0.5);
  };

  const handleClickOrder = useCallback(async () => {
    console.log('checkedProduct: ', checkedProduct);
    dispatch(orderRequest(checkedProduct));
  }, [checkedProduct, dispatch]);

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
            asin={record.key}
            size="small"
            style={{ fontSize: 'x-small', marginBottom: '10px' }}
            onClick={handleClickCart}
          >
            ADD TO CART
          </Button>
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

  const CalTotalPrice = useEffect(() => {
    let sumPrice = 0;
    let price = 0;
    let regex = /[^0-9]/g;

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
      <ProductListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ y: 720 }}
        onRow={(record, index) => ({
          onClick: () => {
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
          <Button size="large" onClick={handleClickLikesSelected}>
            ADD TO LIKES
          </Button>
          <Button size="large" onClick={handleClickCartSelected}>
            ADD TO CART
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              handleClickOrder();
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
