import { useCallback, useEffect, useState } from 'react';
import { Table, Typography, message } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCart,
  showModal,
  deleteCart,
  orderRequest,
  addToLikes,
  undoLikes,
  loadLikes,
} from '../../actions/productsActions';
import { useHistory, Link } from 'react-router-dom';
import ImageUrl from '../../url/imageUrl';

export default function CartList() {
  const history = useHistory();
  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartList = useSelector((state) => state.cartReducer.cartList);
  const likeProducts = useSelector((state) => state.likesReducer.likeProducts);

  const modal = useSelector((state) => state.showModalReducer.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart());
    dispatch(loadLikes());
  }, []);

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
    message.success('Successfully removed from your likes', 0.5);
  };

  const handleClickLikesSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(addToLikes(checkedIdList));
    message.success('Successfully added from your likes', 0.5);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    const deleteProductId = e.currentTarget.getAttribute('asin');
    console.log(deleteProductId);
    dispatch(deleteCart([deleteProductId]));
    message.success('Successfully removed from your cart ', 0.5);
    // "Are you sure you want to delete?"alert 띄우기
  };

  const handleClickDeleteSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(deleteCart(checkedIdList));
    message.success('Successfully removed from your cart ', 0.5);
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
          alt={'No Image'}
          src={theImageURL}
          style={{ width: 150, height: 150 }}
        />
      ),
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'name',
      width: 300,
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
          key={record.key}
          style={{
            fontSize: 'xx-small',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          {likeProducts.includes(record.key) ? (
            <HeartFilled
              style={{ fontSize: '3rem', color: '#ff6f00' }}
              asin={record.key}
              onClick={handleClickUndoLikes}
            />
          ) : (
            <HeartOutlined
              style={{ fontSize: '3rem', color: 'darkgray' }}
              asin={record.key}
              onClick={handleClickLikes}
            />
          )}
          <DeleteOutlined
            asin={record.key}
            style={{
              marginTop: '1rem',
              fontSize: '3rem',
              color: 'darkgray',
            }}
            onClick={handleClickDelete}
          />
        </div>
      ),
      width: '11%',
    },
  ];

  const CartListTableData = [];

  cartList.map((cart) => {
    CartListTableData.push({
      key: cart.asin,
      ImageURL: ImageUrl(cart.asin),
      name: cart.title,
      price: cart.price,
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
    <Container>
      <CartListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={CartListTableData}
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
          <div style={{ float: 'left' }}>
            <OutLinedButton onClick={handleClickDeleteSelected}>
              <DeleteOutlined
                style={{ color: 'darkgray', fontSize: '1.8rem' }}
              />
              &nbsp;&nbsp; DELETE SELECTED
            </OutLinedButton>
          </div>
          <OutLinedButton onClick={handleClickLikesSelected}>
            ADD TO LIKES
          </OutLinedButton>
          <Button
            onClick={() => {
              handleClickOrder();
              history.push('/payment');
            }}
          >
            ORDER NOW
          </Button>
        </ButtonGroup>
      </TableFooter>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const CartListTable = styled(Table)`
  .ant-pagination {
    display: none;
  }
  .ant-table-wrapper {
    border-left: solid 1px #dfe4ea;
    border-bottom: solid 0.1px #dfe4ea;
  }

  //thead css
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 1rem;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 1rem;
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

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #f1f2f6;
  }

  //checkbox css
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff6f00;
    border-color: #ff6f00;
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: #ff6f00;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #ff6f00;
  }
`;

const TableFooter = styled.div`
  text-align: right;
  bottom: 1px;
  position: sticky;
  background: white;
  padding: 10px;
  border-top: solid 0.15rem #ff6f00;
`;

const ButtonGroup = styled.div`
  button {
    margin-left: 5px;
  }
`;

const Button = styled.button`
  background: #ff6f00;
  height: 4rem;
  border: 0.1rem solid #ff6f00;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  color: white;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2;
  margin: 5px 0;
  padding-inline: 2rem;

  :hover {
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;

const OutLinedButton = styled(Button)`
  background: #fff;
  color: #ff6f00;
`;
