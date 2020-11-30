import React, { useState, useEffect } from 'react';

import {  Modal, Button  } from 'antd';

import { get, fetcher } from '../utils/api';
import SearchableTable from '../searchable-table'
import { genRandomString } from '../utils/helpers'


export default function MyModal(props) {
  const [visible, setVisible]               = useState(props.modalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [error, setError]           = useState(null);
  const [isLoaded, setIsLoaded]     = useState(false);
  const [components, setComponents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    get('components')
    .then(
      (result) => {
        return parseJson(result)
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    .then((result) => {
      setIsLoaded(true);
      setComponents(result);
    })
  }, []);

  const parseJson = (result) => {
    result.map(item => {
      item.key = item.id + '-' + genRandomString();
      item.supplier = item.supplier ? item.supplier.name : ''
    })
    return result;
  }

  const handleOk = () => {
    setConfirmLoading(true);

    fetcher('products/' + props.productId + '/trees', {
      component_id: props.selectedId,
      subcomponent_ids: getIds(selectedRowKeys),
      product_id: props.productId
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
          setIsLoaded(true);
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

  const getIds = (keys) => {
    return keys.map((el) => {return el.split('-')[0]});
  }

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