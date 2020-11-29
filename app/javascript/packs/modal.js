import React, { useState, useEffect } from 'react';

import {  Modal, Button  } from 'antd';

import { get, post } from './api';
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

    post('products/' + props.productId + '/trees', {
      component_id: props.selectedId,
      subcomponent_id: 12
    })
      .then(
        (result) => {
          setIsLoaded(true);
          setConfirmLoading(false);
          setVisible(false);
          props.setModalOpen(false)
          props.setUpdate(!props.update)
        },
        (error) => {
          debugger
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    props.setModalOpen(false)
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