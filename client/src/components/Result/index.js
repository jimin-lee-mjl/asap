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
      }}
    >
      <ProductTable />
    </div>
  );
}
