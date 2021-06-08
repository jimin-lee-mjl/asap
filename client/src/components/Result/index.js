import React from 'react';
import ProductTable from './productTable';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';

export default function Result() {
  return (
    <ResultContainer>
      <ProductTable />
      <ProductDetailModal />
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 100px;
`;
