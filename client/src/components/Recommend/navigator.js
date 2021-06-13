import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
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
      <Link to="/select">
        <OutLinedButton style={{ marginRight: 10 }}>Previous</OutLinedButton>
      </Link>
      <Link to="/result">
        <Button onClick={handleClickComplete}>Done</Button>
      </Link>
    </NavigatorContainer>
  );
}

const NavigatorContainer = styled.div`
  margin: 10px;
`;

const Button = styled.button`
  background: #ff6f00;
  width: 8rem;
  height: 4rem;
  border: 0.1rem solid #ff6f00;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  color: white;
  margin: 0 3vw;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  line-height: 2;
  margin: 5px 0;

  :hover {
    box-shadow: 2px 4px 8px #c4c4c4;
  }
`;

const OutLinedButton = styled(Button)`
  background: #fff;
  color: #ff6f00;
`;
