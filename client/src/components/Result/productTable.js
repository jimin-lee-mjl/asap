import { Table, Button, Typography } from 'antd';
import ProductCard from './productCard';

export default function ProductTable() {
  const { Title } = Typography;

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

  const rowSelection = () => {};
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        style={{
          width: '1000px',
        }}
      />
      <div className="table-footer">
        <div>
          <Title>총 2개 상품 &nbsp; &nbsp;총 100,000원</Title>
        </div>
        <div className="btn-group">
          <Button size="large">선택한 상품 찜하기</Button>
          <Button size="large">선택한 상품 장바구니에 담기</Button>
          <Button type="primary" size="large">
            선택한 상품 구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
