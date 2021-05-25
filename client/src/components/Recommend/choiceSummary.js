import React, { useState, useContext } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

export default function ChoiceSummary() {
  return (
    <ChoiceSummaryContainer>
      <Card
        title="총 가격"
        // extra={<a href="#">More</a>}
        style={{ width: 600 }}
        headStyle={{ fontSize: 30, fontWeight: 'bold' }}
      >
        <div style={{ fontSize: 20 }}>
          <ChosenCategory>상의</ChosenCategory>
          <p>30,000원</p>
          <ChosenCategory>상의</ChosenCategory>
          <p>70,000원</p>
        </div>
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
