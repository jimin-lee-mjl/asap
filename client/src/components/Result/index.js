import React from 'react';
import ProductTable from './productTable';
import styled from 'styled-components';

export default function Result() {
  return (
    <ResultContainer>
      <ProductTable />
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 100px;
`;
