import React from 'react';

export default function Error({ error }) {
  if (!error) return null;
  return (
    <p className="error"
    style={{
        color: '#f31',
        fontSize: '10px',
      }
    }>
      {error}
    </p>);
};

