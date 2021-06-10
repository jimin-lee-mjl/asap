import { useCallback, useEffect, useState } from 'react';
import { Table, Typography, message } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLikes,
  showModal,
  deleteLikes,
  loadCart,
  addToCart,
  undoCart,
} from '../../actions/productsActions';
import { Link } from 'react-router-dom';

export default function CartList() {
  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const modal = useSelector((state) => state.showModalReducer.modal);
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const likesList = useSelector((state) => state.likesReducer.likesList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLikes());
    dispatch(loadCart());
  }, []);

  const handleClickCart = (e) => {
    e.stopPropagation();
    const addCartProductId = e.currentTarget.getAttribute('asin');
    console.log(addCartProductId);
    dispatch(addToCart([addCartProductId]));
    message.success('add to cart', 0.5);
  };

  const handleClickUndoCart = (e) => {
    e.stopPropagation();
    const undoCartProductId = e.currentTarget.getAttribute('asin');
    console.log(undoCartProductId);
    dispatch(undoCart([undoCartProductId]));
    message.success('찜이 해제되었습니다', 0.5);
  };

  const handleClickCartSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(addToCart(checkedIdList));
    message.success('add to cart', 0.5);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    const deleteProductId = e.currentTarget.getAttribute('asin');
    console.log([deleteProductId]);
    dispatch(deleteLikes([deleteProductId]));
    message.success('선택한 상품이 장바구니에서 삭제되었습니다. ', 0.5);
    // "Are you sure you want to delete?"alert 띄우기
  };

  const handleClickDeleteSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(deleteLikes(checkedIdList));
    message.success('선택한 상품이 장바구니에서 삭제되었습니다. ', 0.5);
  };

  // const handleClickDelete = useCallback(async () => {
  //   console.log('handleClickDelete');
  //   console.log('deleteProduct: ', checkedProduct);
  //   message.success('선택한 상품이 찜 목록에서 삭제되었습니다. ', 0.5);
  //   // "Are you sure you want to delete?"alert 띄우기
  //   // delete api 코드
  // }, [likesApiUrl, checkedProduct]);

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
              style={{ fontSize: '3.8rem', color: 'grey' }}
              asin={record.key}
              onClick={handleClickCart}
            />
          )}
          <DeleteOutlined
            asin={record.key}
            style={{
              marginTop: '1rem',
              fontSize: '3rem',
              color: 'darkgray',
              paddingLeft: '0.6rem',
            }}
            onClick={handleClickDelete}
          />
        </div>
      ),
      width: '11%',
    },
  ];
  const likesListTableData = [];

  Object.entries(likesList).map((likes) => {
    const likesProduct = likes[1];
    console.log('likesProduct', likesProduct);
    likesListTableData.push({
      key: likesProduct.id,
      ImageURL: likesProduct.image,
      name: likesProduct.title,
      price: likesProduct.price,
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

  return (
    <Container>
      <LikesListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={likesListTableData}
        onRow={(
          record,

          index,
        ) => ({
          onClick: () => {
            console.log(record, index, 'clicked!!');
            dispatch(showModal(record.key));
          },
        })}
      />
      <TableFooter>
        <ButtonGroup>
          <div style={{ float: 'left' }}>
            <OutLinedButton onClick={handleClickDeleteSelected}>
              <DeleteOutlined
                style={{ color: 'darkgray', fontSize: '1.8rem' }}
              />
              &nbsp;&nbsp; DELETE SELECTED
            </OutLinedButton>
          </div>
          <OutLinedButton onClick={handleClickCartSelected}>
            <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
            &nbsp;&nbsp; ADD TO CART
          </OutLinedButton>
        </ButtonGroup>
      </TableFooter>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const LikesListTable = styled(Table)`
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
