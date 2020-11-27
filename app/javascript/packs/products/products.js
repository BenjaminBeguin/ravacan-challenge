import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
const { Title } = Typography;

import { get } from '../api';


export default function Products() {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    get('products')
      .then(
        (result) => {
          setIsLoaded(true);
          setProducts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Title level={2}>Products</Title>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`products/${product.id}`}> {product.name} </Link>
          </li>
        ))}
      </ul>
      </>
    );
  }
}