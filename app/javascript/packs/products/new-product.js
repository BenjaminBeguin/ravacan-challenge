import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {  Form, Input, Button, Typography, notification } from 'antd';
const { Title } = Typography;

import { post } from '../api';
import { successToast } from '../toast'

const layout = {
  wrapperCol: {
    span: 6,
  },
};

const NewProduct = () => {
  
  const onFinish = (values) => {
    console.log('Success:', values);
    post('products', 'product', values)
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
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
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
