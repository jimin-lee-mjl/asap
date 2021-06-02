import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function ItemCard({ productId }) {
  const [item, setItem] = useState({});

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => console.log(err));
    setItem(response.data);
  };

  useEffect(() => {
    if (productId && productId !== '') {
      fetchProductDetail();
    }
  }, [productId]);

  return (
    <>
      {Object.keys(item).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div
          style={{
            width: '40%',
            height: '25%',
            border: '1px solid black',
            margin: '1rem',
            padding: '0.5rem',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          {/* <p>
              {item.id}.{item.title}
            </p> */}
        </div>
      )}
    </>
  );
}
