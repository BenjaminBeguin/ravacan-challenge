import React, { useState, useEffect } from 'react';

import {  Modal, Button  } from 'antd';

import { get } from './api';
import ComponentList from './components/component-list'


export default function MyModal(props) {
  const [visible, setVisible]               = useState(props.modalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [error, setError]           = useState(null);
  const [isLoaded, setIsLoaded]     = useState(false);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    get('components/')
      .then(
        (result) => {
          setIsLoaded(true);
          setComponents(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Select a subcomponent."
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {components && props.selectedId }
        {components && <ComponentList components={components} />}
      </Modal>
    </>
  );
};