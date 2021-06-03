import React, { useState } from 'react';
import styled from 'styled-components';
import { Slider, InputNumber, Button, Input, Select } from 'antd';

export default function Category() {
  const marks = {
    0: '0',
    10: '10만원',
    30: '30만원',
    50: '50만원',
    100: '100만원',
  };

  const { Option } = Select;
  const [inputValue, setInputValue] = useState([0, 10]);

  function StartChange(value) {
    const newValue = [value] + inputValue[1];
    setInputValue(newValue);
  }
  function EndChange(value) {
    const newValue = inputValue[0] + [value];
    setInputValue(newValue);
  }
  function AllChange(value) {
    setInputValue(value);
  }

  function onChange(value) {
    console.log(value);
  }

  return (
    <div>
      <h1>추천 정보를 입력해주세요</h1>
      <div style={{ width: '100%' }}>
        나의 예산💰
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue[0]}
          onChange={StartChange}
        />{' '}
        ~{' '}
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue[1]}
          onChange={EndChange}
        />
        <Slider range value={inputValue} onChange={AllChange} marks={marks} />
      </div>
      <br />
      추천 받고싶은 카테고리별 아이템 개수
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Card>
          🧥 <p>Outer</p>
        </Card>
        <Card>
          👕 <p>Top</p>
        </Card>
        <Card>
          🩳 <p>Bottom</p>
        </Card>
      </div>
      <div className="site-input-number-wrapper">
        <InputNumber
          min={0}
          max={5}
          defaultValue={1}
          onChange={onChange}
          style={{ width: '100px' }}
        />
        <InputNumber
          min={0}
          max={5}
          defaultValue={0}
          onChange={onChange}
          style={{ width: '100px' }}
        />
        <InputNumber
          min={0}
          max={5}
          defaultValue={0}
          onChange={onChange}
          style={{ width: '100px' }}
        />
      </div>
      <br />
      다른 아이템도 추천 받기
      <Input.Group compact>
        <Select defaultValue="ETC" style={{ width: '30%' }}>
          <Option value="Bag">가방</Option>
          <Option value="Shoes">신발</Option>
          <Option value="Cap">모자</Option>
          <Option value="Clock">시계</Option>
          <Option value="etcetc">그 외 기타</Option>
        </Select>
        <InputNumber
          min={0}
          max={5}
          defaultValue={0}
          onChange={onChange}
          style={{ width: '100px' }}
        />
      </Input.Group>
    </div>
  );
}

const Card = styled(Button)`
  display: block;
  width: 100px;
  height: 100px;
  font-size: 20px;

  p {
    font-size: 15px;
  }
`;
