import React from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

export default function Category() {
  const categories = [
    'Outer',
    'Top',
    'Bottom',
    'Set',
    'Sports Wear',
    'Underwear/Homewear',
    'Shoes',
    'Bag',
    'Accessories',
  ];
  return (
    <>
      <h1>Choose catagories!</h1>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <Checkboxes
          options={categories}
          defaultValue={[]}
          onChange={onChange}
        />
      </div>
    </>
  );
}

const Checkboxes = styled(Checkbox.Group)`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  .ant-checkbox-wrapper {
    font-size: 2rem;
    margin: 2rem;
    padding: 1rem;
    width: 25%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff6f00;
    border-color: #ff6f00;
  }

  .ant-checkbox-checked::after {
    border: 1px solid #ff6f00;
  }
`;
