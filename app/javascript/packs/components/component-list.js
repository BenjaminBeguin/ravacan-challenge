import React from 'react';

export default function ComponentList(props) {
  return (
    <>
    <h2>Products</h2>
    <ul>
      {props.components.map(component => (
        <li key={component.id}>
          {component.name}
        </li>
      ))}
    </ul>
    </>
  )
}