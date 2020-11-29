import React, { useState, useEffect } from 'react';

import SearchableTable from '../searchable-table'
import { get } from '../api'

export default function Components(props) {
  const [error, setError]       = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [components, setComponents] = useState([]);

  const parseJson = (result) => {
    result.map(item => {
      item.key = item.id;
      item.supplier = item.supplier.name
    })
    return result;
  }

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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <h2>Components</h2>
      <SearchableTable data={components} />
      </>
    );
  }

}