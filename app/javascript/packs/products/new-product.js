import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {   
Typography, 
notification } from 'antd';
const { Title } = Typography;

import ProductForm from './product-form'

const NewProduct = () => {
  
  return (
    <>
    <Title level={2}>Create A New Product</Title>
    <ProductForm />
    </>
  );
};

export default NewProduct;
