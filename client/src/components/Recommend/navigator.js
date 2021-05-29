import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <Link to="/info">
        <Button type="primary" size={'large'} style={{ marginRight: 10 }}>
          이전으로
        </Button>
      </Link>
      <Link to="/result">
        <Button type="primary" size={'large'} onClick={handleClickComplete}>
          선택 완료
        </Button>
      </Link>
    </NavigatorContainer>
  );
}

const NavigatorContainer = styled.div`
  margin: 10px;
`;
