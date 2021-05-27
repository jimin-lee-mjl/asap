import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

export default function ChoiceSummary() {
  const categoryList = useSelector(
    (state) => state.setCategoryReducer.category,
  );
  const selectedProducts = useSelector(
    (state) => state.selectProductReducer.selectedProducts,
  );
  const dispatch = useDispatch();

  const choiceSummaryArray = [];
  const choiceSummary = () => {
    console.log('categoryList:', categoryList);

    categoryList.map((category) => {
      var priceSum = 0;
      selectedProducts[category].map((product) => {
        priceSum += Number(product.price);
      });
      console.log(priceSum);
      choiceSummaryArray.push(
        <div>
          <ChosenCategory>{category}</ChosenCategory>
          <p>{priceSum}</p>
        </div>,
      );
    });
    return choiceSummaryArray;
  };

  useEffect(() => {
    choiceSummary();
  }, [categoryList, selectedProducts]);

  return (
    <ChoiceSummaryContainer>
      <Card
        title="총 가격"
        style={{ width: 600 }}
        headStyle={{ fontSize: 30, fontWeight: 'bold' }}
      >
        <div style={{ fontSize: 20 }}>{choiceSummary()}</div>
      </Card>
    </ChoiceSummaryContainer>
  );
}

const ChoiceSummaryContainer = styled.div`
  display: inline-block;
`;

const ChosenCategory = styled.p`
  font-weight: bold;
`;
