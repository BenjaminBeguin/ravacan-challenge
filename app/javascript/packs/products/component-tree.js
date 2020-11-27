import React, { useState } from 'react';
import {  Tree  } from 'antd';
const { TreeNode } = Tree;

const ComponentTree = ({treeData}) => {
  const [expandedKeys, setExpandedKeys] = useState(['First Product']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

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
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  const renderTreeNodes = (data) => {
    data.map(item => {

      if (item.treeData) {
        return (
          <TreeNode title={item.name} key={item.name} dataRef={item}>
            {renderTreeNodes(item.treeData)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.name} {...item} />
    });
      }

  return (
    <>
      {treeData && <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}/>
      }
    </>
  );

};

export default ComponentTree;