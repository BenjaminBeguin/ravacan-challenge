import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

import {  Layout } from 'antd';
const { Header, Content } = Layout;
import 'antd/dist/antd.css';

import App from "./app";
import MyGrid from "./layout/grid";
import MyMenu from "./layout/menu";



ReactDOM.render(
  <Router>
    <Layout className="layout">
        
        <Header>
          <MyGrid>
            <MyMenu/>
          </MyGrid>
        </Header>

        <Content style={{ padding: '30px 50px', background:'white' }}>
          <div className="site-layout-content">
          <MyGrid>
            <App/>
          </MyGrid>
          </div>
        </Content>
        
      </Layout>
  </Router>,
  document.getElementById("root")
);