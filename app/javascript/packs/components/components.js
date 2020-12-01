import React, { useState, useEffect } from 'react';

import { Typography, List, Spin } from 'antd';
const { Title } = Typography;

import SearchableTable from '../searchable-table'
import { get } from '../utils/api'
import { parseTableJson } from '../utils/helpers'

export default function Components(props) {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    get('components')
      .then(
        (result) => {
          return parseTableJson(result)
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Spin />;
  } else {
    return (
      <>
      <Title level={2}>Components</Title>
      {components.length ? 
        <SearchableTable data={components} />
        : 'There are no components.' }
      </>
    );
  }

}