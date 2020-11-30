import React, { useState, useEffect } from 'react';

import SearchableTable from '../searchable-table'
import { get } from '../api'
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
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <h2>Components</h2>
      {components.length ? 
        <SearchableTable data={components} />
        : 'There are no components.' }
      </>
    );
  }

}