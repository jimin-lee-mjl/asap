import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLikes,
  showModal,
  addToCart,
  deleteLikes,
} from '../../actions/productsActions';
import { Link } from 'react-router-dom';

export default function CartList() {
  const { Title } = Typography;
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const likesList = useSelector((state) => state.likesReducer.likesList);
  const modal = useSelector((state) => state.showModalReducer.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLikes());
  }, []);

  const handleClickCart = (e) => {
    e.stopPropagation();
    const addCartProductId = e.currentTarget.getAttribute('asin');
    console.log(addCartProductId);
    dispatch(addToCart(addCartProductId));
    message.success('add to cart', 0.5);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    const deleteProductId = e.currentTarget.getAttribute('asin');
    console.log(deleteProductId);
    dispatch(deleteLikes(deleteProductId));
    message.success('선택한 상품이 장바구니에서 삭제되었습니다. ', 0.5);
    // "Are you sure you want to delete?"alert 띄우기
  };

  const handleClickCartSelected = (e) => {
    e.stopPropagation();
    const checkedIdList = checkedProduct.map((product) => product.key);
    console.log(checkedIdList);
    dispatch(addToCart(checkedIdList));
    message.success('add to cart', 0.5);
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
          <Button
            asin={record.key}
            size="small"
            style={{ fontSize: 'xx-small' }}
            onClick={handleClickDelete}
          >
            DELETE
          </Button>
        </div>
      ),
      width: '10%',
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
    <div>
      <LikesListTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={likesListTableData}
        scroll={{ y: 720 }}
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
            <Button size="large" onClick={handleClickDeleteSelected}>
              DELETE SELECTED
            </Button>
          </div>
          <Button size="large" onClick={handleClickCartSelected}>
            ADD TO CART
          </Button>
        </ButtonGroup>
      </TableFooter>
    </div>
  );
}

const LikesListTable = styled(Table)`
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
