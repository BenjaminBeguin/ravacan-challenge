import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {  
Form, 
Input, 
InputNumber,
Button, 
Typography, 
notification } from 'antd';
const { Title } = Typography;

import { fetcher } from '../api';
import { successToast } from '../toast'

const NewProduct = () => {
  
  const onFinish = (values) => {
    debugger
    console.log('Success:', values);
    fetcher('products', values)
      .then(
        (product) => {
          successToast({
            message: 'Product was successfully created!',
            description: 'Go to the product page to add components.',
          });
          //redirect to product.
        })
      .catch((error) => {
        // errorToast({
        //   message: 'Product was successfully created!',
        //   error: error
        // });
        console.log(error)
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    <Title level={2}>Create A New Product</Title>
    <Form
      name="new-product"
      wrapperCol={{
        span: 6,
      }}
      layout="vertical"
      initialValues={{
        price: 1000,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'The product name cannot be empty!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'The product price cannot be empty!',
          },
        ]}
      >
        <InputNumber
          step={100}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default NewProduct;
