import React, { useState, useEffect } from 'react';

import { 
Tree, 
Button, 
Card, 
Tooltip,
Space,
Spin } from 'antd';
import { 
PlusCircleFilled, 
DeleteFilled, DownOutlined } from '@ant-design/icons';

import { get, fetcher } from '../utils/api'
import MyModal from '../components/modal'
import { genRandomString } from '../utils/helpers'

let selectedNodes = [];
let selectedId = null;

const ComponentTree = ({ product, setCost=null, edit=true }) => {
  // Porduct Tree state
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [update, setUpdate]     = useState(false);
  const [productTree, setProductTree] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // Antd Tree state
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys]   = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    if(!product.id) return
    get('products/' + product.id + '/tree')
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
        setProductTree(result.children);
        if(setCost) setCost(result.cost)
        setExpandedKeys([result.children[0].key])
      })
  }, [product, update])

  const parseJson = (result) => {
    result.children.map((item) => {
      item.key = item.name + '-' + genRandomString()
      if(item.children) parseJson(item)
    })
    return result;
  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    selectedNodes = selectedKeys;
    setSelectedKeys(selectedKeys);
  };

  const renderEl = (item) => {
    let selected = false;
    if(selectedNodes?.includes(item.key))
      selected = true;

    return <CustomNode item={item} selected={selected} 
      addClick={addClick} removeClick={removeClick} edit={edit} />;
  };

  const addClick = (e, item) => {
    selectedId = item.child_id;
    setModalOpen(true)
  };

  const removeClick = (e, item) => {
    setIsLoaded(false);

    fetcher('products/' + product.id + '/trees/' + item.edge_id, 
      {}, 'DELETE')
      .then(
        (result) => {
          setIsLoaded(true);
          setUpdate(!update)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Spin />;
  } else {
    return (
      <>
      <Card>
        <Tree
          switcherIcon={<DownOutlined />}
          checkable={edit ? true : false}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          titleRender={renderEl}
          treeData={productTree} 
          style={{fontSize: '16px'}}/>
        </Card>
        {modalOpen && edit &&
          <MyModal 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            selectedId={selectedId} 
            productId={product.id}
            update={update}
            setUpdate={setUpdate}
            />}
      </>
    );
  }

};

function CustomNode(props) {
  const item = props.item;
  const selected = props.selected;

  return (
    <div id={item.key} style={{padding: "5px 5px"}}>
      <Space>
      <span>{item.name}</span>
      {selected && props.edit ?
        (<><Tooltip title="Add a subcomponent">
          <Button key={`${item.key}-add`} shape="circle" 
          icon={<PlusCircleFilled />} onClick={e => props.addClick(e, item)} />
        </Tooltip>
        {item.parent_id ? <Tooltip title="Remove this component">
          <Button key={`${item.key}-rm`} shape="circle" 
          icon={<DeleteFilled />} onClick={e => props.removeClick(e, item)} />
        </Tooltip>:''}</>)
        :
        ''}
        </Space>
    </div>
  );
}

export default ComponentTree;