import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

export default function Navigator() {
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const dispatch = useDispatch();

  const handleClickComplete = () => {
    console.log(selectedProducts);
  };

  return (
    <NavigatorContainer>
      <Button type="primary" size={'large'} style={{ marginRight: 10 }}>
        이전으로
      </Button>
      <Button type="primary" size={'large'} onClick={handleClickComplete}>
        선택 완료
      </Button>
    </NavigatorContainer>
  );
}

const NavigatorContainer = styled.div`
  margin: 10px;
`;
