import React, { useState } from 'react';

import {
Form, 
Input, 
InputNumber,
Button,
Card } from 'antd';

import { fetcher } from '../api';
import { successToast } from '../toast'

export default function ProductForm({ product, method='POST' }){

  const reqParams = {
    endpoint: method  == 'POST' ? 'products' : 'products/'+product.id,
    btnText: method   == 'POST' ? 'Create ' : 'Update ',
    toastText: method == 'POST' ? 'created' : 'updated'
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    fetcher(reqParams.endpoint, values, method)
      .then(
        (product) => {
          successToast({
            message: 'Product was successfully ' + reqParams.toastText + '!',
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

  return(
    <Card>
      <Form
        name="new-product"
        wrapperCol={{
          span: 6,
        }}
        layout="vertical"
        initialValues={{
          name: product?.name,
          price: product?.price || 0
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
            {reqParams.btnText} Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}