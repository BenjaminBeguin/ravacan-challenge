import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography, List, Spin } from 'antd';
const { Title } = Typography;

import { get } from '../utils/api';


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
    return <Spin />;
  } else {
    return (
      <>
      <Title level={2}>Products</Title>
      {products.length ? 
        <List
          className="products-list"
          itemLayout="horizontal"
          dataSource={products}
          renderItem={product => (
            <List.Item
              actions={[<Link to={`products/${product.id}/edit`}> Edit </Link>, 
              <Link to={`products/${product.id}`}> Delete </Link>]} 
              >

              <List.Item.Meta
                title={<Link to={`products/${product.id}`}> {product.name} </Link>}
                description="Product description."
              />

            </List.Item>
          )}
        />
      : 'There are no products.'}
      </>
    );
  }
}