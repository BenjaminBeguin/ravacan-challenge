import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

import {   
Typography, 
notification } from 'antd';
const { Title } = Typography;

import { get } from '../utils/api';
import { successToast } from '../toast'
import ProductForm from './product-form'

const NewProduct = () => {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct]   = useState({});
  const { id }                  = useParams();

  useEffect(() => {
    get('products/'+id)
      .then(
        (result) => {
          setProduct(result);
          setIsLoaded(true);
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
      <Title level={2}>Edit {product.name}</Title>
      <ProductForm product={product} method="PATCH" />
      </>
    );
  }
};

export default NewProduct;
