import React from 'react';
import { useDispatch } from 'react-redux';
import { selectCategories } from '../../actions/userSelect';
import { Checkbox } from 'antd';
import styled from 'styled-components';

export default function Category() {
  const dispatch = useDispatch();
  const categories = [
    { label: 'Outer', value: 'outer' },
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Set', value: 'set' },
    { label: 'Sports Wear', value: 'sport' },
    { label: 'Underwear/Homewear', value: 'etc' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Bag', value: 'bag' },
    { label: 'Accessories', value: 'accessories' },
  ];

  function onChange(checkedValues) {
    dispatch(selectCategories(checkedValues));
  }

  return (
    <>
      <h1>Choose Categories!</h1>
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
