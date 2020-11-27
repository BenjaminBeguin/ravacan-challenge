import React from 'react';

import {  Row, Col  } from 'antd';

export default function MyGrid(props) {
  return (
    <Row>
      <Col xs={24} xl={4}>
      </Col>
      <Col xs={24} xl={16}>
        {props.children}
      </Col>
      <Col xs={24} xl={4}>
      </Col>
    </Row>
  )
}
