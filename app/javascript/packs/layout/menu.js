import React from 'react';
import { Link } from "react-router-dom";


import {  Menu, Button  } from 'antd';
const { SubMenu } = Menu;

export default function MyMenu() {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"> <Link to="/"> Home </Link> </Menu.Item>
      <Menu.Item key="2"> <Link to="/components"> Components </Link> </Menu.Item>

      <div style={{float: 'right'}}>
        <Button ghost >
          <Link to="/products/new">New Product</Link>
          </Button>
      </div>
      
    </Menu>
  )
}
