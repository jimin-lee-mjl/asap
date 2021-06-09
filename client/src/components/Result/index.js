import React from 'react';
import ProductTable from './productTable';
import styled from 'styled-components';
import ProductDetailModal from './productDetailModal';
import HeaderComponent from '../Header';

export default function Result() {
  const authToken = localStorage.getItem('token');
  return (
    <>
      {authToken ? (
        <HeaderComponent type="logo" />
      ) : (
        <HeaderComponent type="logo guest" />
      )}
      <ResultContainer>
        <ProductTable />
        <ProductDetailModal />
      </ResultContainer>
    </>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: auto;
  margin-top: 13rem;
  min-height: 75%;
`;
