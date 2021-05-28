import React from 'react';
import ProductTable from './productTable';

export default function Result() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        marginTop: '100px ',
      }}
    >
      <ProductTable />
    </div>
  );
}

// const ResultContainer = styled.div`
//   display: 'flex';
//   justify-content: 'center';
//   align-items: 'center';
//   height: '90vh';
// `;
