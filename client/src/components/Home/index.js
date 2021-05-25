import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  let history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <h1>Home</h1>
      <div>
        <button
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            history.push('/info');
          }}
        >
          Guest
        </button>
      </div>
    </div>
  );
}
