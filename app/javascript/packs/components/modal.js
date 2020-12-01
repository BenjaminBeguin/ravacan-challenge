import React, { useState, useEffect } from 'react';

import {  Modal, Button  } from 'antd';

import { get, fetcher } from '../utils/api';
import SearchableTable from '../searchable-table'
import { parseTableJson } from '../utils/helpers'

export default function MyModal(props) {
  const [visible, setVisible]               = useState(props.modalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [error, setError]           = useState(null);
  const [components, setComponents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    get('components')
    .then(
      (result) => {
        return parseTableJson(result)
      },
      (error) => {
        setError(error);
      }
    )
    .then((result) => {
      setComponents(result);
    })
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);

    fetcher('products/' + props.productId + '/trees', {
      component_id: props.selectedId,
      subcomponent_ids: selectedRowKeys,
      product_id: props.productId
    })
      .then(
        (result) => {
          setConfirmLoading(false);
          setVisible(false);
          props.setModalOpen(false)
          props.setUpdate(!props.update)
        },
        (error) => {
          setConfirmLoading(false);
          setError(error);
        }
      )
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    setSelectedRowKeys([]);
    props.setModalOpen(false);
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
        {components && <SearchableTable 
          data={components} 
          checkable={true}
          setSelectedRowKeys = {setSelectedRowKeys} />}
      </Modal>
    </>
  );
};