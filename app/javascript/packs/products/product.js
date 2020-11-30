import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import { Typography, Button, Space } from 'antd';
const { Title } = Typography;

import { get } from '../utils/api'
import ComponentTree from './component-tree'

export default function Product() {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct]   = useState({});
  const [cost, setCost]         = useState(null);
  const { id }                  = useParams();

  useEffect(() => {
    get('products/'+id)
      .then(
        (result) => {
          setIsLoaded(true);
          setProduct(result);
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
      <Space>
      <Title level={2} style={{display: 'inline-block'}}>{product.name} </Title>
      <Link to={`/products/${product.id}/edit`}>
        <Button style={{marginBottom: '13px'}}>Edit Product</Button>
      </Link>
      </Space>
      <Title level={5}>Price: ${product.price} {cost ? `| Cost: $${cost}` : '' }</Title>
      <Title level={3}>Tree View</Title>

      <ComponentTree product={product} setCost={setCost} />
      </>
    );
  }
}