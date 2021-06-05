import React, { useEffect, useState } from 'react';
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

  const choiceSummaryArray = [];
  const choiceSummary = () => {
    console.log('categoryList:', categoryList);
    var totalPrice = 0;

    categoryList.map((category) => {
      var priceSumPerCategory = 0;
      selectedProducts[category].map((product) => {
        priceSumPerCategory += Number(product.price);
      });
      console.log('priceSumPerCategory:', priceSumPerCategory);
      const categoryName = category.toUpperCase();
      choiceSummaryArray.push(
        <div key={categoryName}>
          <ChosenCategory>{categoryName}</ChosenCategory>
          <p>{priceSumPerCategory}</p>
        </div>,
      );
      totalPrice += priceSumPerCategory;
    });

    console.log('totalPrice:', totalPrice);
    choiceSummaryArray.push(
      <TotalSummary key="total">
        <p>Total Price</p>
        <p>{totalPrice.toFixed(2)}</p>
      </TotalSummary>,
    );

    return choiceSummaryArray;
  };

  return (
    <ChoiceSummaryContainer>
      <Card
        title="Price Info"
        style={{ width: 200 }}
        headStyle={{
          fontSize: 30,
          fontWeight: 'bold',
          borderBottom: '5px solid #f0f0f0',
        }}
        style={{ border: '5px solid #f0f0f0', position: 'fixed' }}
      >
        <ChoiceSummaryDiv>{choiceSummary()}</ChoiceSummaryDiv>
      </Card>
    </ChoiceSummaryContainer>
  );
}

const ChoiceSummaryContainer = styled.div`
  display: inline-block;
  margin-right: 200px;
  margin-top: 10px;
`;

const ChoiceSummaryDiv = styled.div`
  font-size: 20px;
`;
const ChosenCategory = styled.p`
  font-weight: bold;
`;

const TotalSummary = styled.div`
  font-weight: bold;
  border: solid 1px #1890ff;
  padding-top: 10px;
`;
