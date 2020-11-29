import React, { useState, useEffect } from 'react';

import {  Tree, Button, Card, Tooltip } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
const { TreeNode } = Tree;

import { get } from '../api'
import MyModal from '../modal'

let selectedNodes = [];

const ComponentTree = ({ product, setProduct }) => {
  // Porduct Tree state
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, setUpdate]     = useState(false);
  const [productTree, setProductTree] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // Antd Tree state
  const [expandedKeys, setExpandedKeys] = useState(['First Product']);
  const [checkedKeys, setCheckedKeys]   = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    console.log('effect')
    if(!product.id) return
    get('products/' + product.id)
      .then(
        (result) => {
          setIsLoaded(true);
          setProductTree(result.children);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [product, update])

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect: ', info);
    selectedNodes = selectedKeys;
    console.log(1,selectedNodes)
    setSelectedKeys(selectedKeys);
  };

  const renderEl = (item) => {
    let selected = false;
    if(selectedNodes?.includes(item.key))
      selected = true;

    return <CustomNode item={item} selected={selected} addClick={addClick} removeClick={removeClick} />;
  };

  const addClick = (e, item) => {
    //fire model
    //user picks subcomp = child_id
    //send post( CompoToComp.create(comp:item.id, subcomp: child_id) )
    setModalOpen(true)
  };

  const removeClick = (e, item) => {
    //send delete( CompoToComp.find(comp:item.parent, subcomp: item.id).destroy )
    debugger
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          titleRender={renderEl}
          treeData={productTree} />
        {modalOpen && <MyModal modalOpen={modalOpen} />}
      </>
    );
  }

};

function CustomNode(props) {
  const item = props.item;
  const selected = props.selected;
  return (
    <div id={item.key}>
      {item.name}
      {selected ?
        (<><Tooltip title="Add a subcomponent">
          <Button key={`${item.key}-add`} shape="circle" icon={<PlusCircleOutlined />} onClick={e => props.addClick(e, item)} />
        </Tooltip>
        <Tooltip title="Remove this component">
          <Button key={`${item.key}-rm`} shape="circle" icon={<DeleteOutlined />} onClick={e => props.removeClick(e, item)} />
        </Tooltip></>)
        :
        ''}
    </div>
  );
}

export default ComponentTree;