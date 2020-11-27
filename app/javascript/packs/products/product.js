import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Typography } from 'antd';
const { Title } = Typography;

import { get } from '../api'
import ComponentTree from './component-tree'

export default function Product() {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct]   = useState({});
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
      <Title level={2}>{product.name}</Title>
      <ComponentTree treeData={product.children}/>
      </>
    );
  }
}