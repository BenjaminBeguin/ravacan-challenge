import React from 'react';
import { Link } from "react-router-dom";


import {  Menu, Button  } from 'antd';
const { SubMenu } = Menu;

export default function MyMenu() {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"> <Link to="/"> Home </Link> </Menu.Item>
      <Menu.Item key="2"> <Link to="/test"> Test </Link> </Menu.Item>
      <SubMenu
          key="SubMenu"
          title="Products"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <div style={{float: 'right'}}>
          <Button ghost >
            <Link to="/products/new">New Product</Link>
            </Button>
        </div>
    </Menu>
  )
}
