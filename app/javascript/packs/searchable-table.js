import React, { useState } from 'react';

import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const cols = [ //default for components table, but can be overriden.
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price($)',
    dataIndex: 'price',
  },
  {
    title: 'Supplier Name',
    dataIndex: 'supplier',
  }
];

export default function SearchableTable({ data, checkable, setSelectedRowKeys, columns=cols }) {

  const [filterTable, setFilterTable] = useState(null);

  const onSearch = (e) => {
    const input        = e.target.value.trim().toLowerCase();
    const filteredData = data.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(input)));
    setFilterTable(filteredData);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  return (
    <div>
      <Input 
        onChange={onSearch}
        placeholder="Search" 
        prefix={<SearchOutlined />} 
        style={{ marginBottom: 10, width:250 }} 
        />
      <Table 
        rowSelection={checkable ? rowSelection : null}
        columns={columns} 
        dataSource={filterTable == null ? data : filterTable} 
        />
    </div>
  );
}