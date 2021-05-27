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

    var TotalPrice = 0;
    categoryList.map((category) => {
      var priceSumPerCategory = 0;
      selectedProducts[category].map((product) => {
        priceSumPerCategory += Number(product.price);
      });
      console.log('priceSumPerCategory:', priceSumPerCategory);
      choiceSummaryArray.push(
        <div>
          <ChosenCategory>{category}</ChosenCategory>
          <p>{priceSumPerCategory}</p>
        </div>,
      );
      TotalPrice += priceSumPerCategory;
    });

    console.log('TotalPrice:', TotalPrice);
    choiceSummaryArray.push(
      <div>
        <TotalSummary>합계</TotalSummary>
        <p>{TotalPrice}</p>
      </div>,
    );

    return choiceSummaryArray;
  };

  return (
    <ChoiceSummaryContainer>
      <Card
        title="가격 정보"
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

const TotalSummary = styled.p`
  font-weight: bold;
`;
