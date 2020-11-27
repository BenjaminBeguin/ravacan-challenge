import React from "react"

import { Switch, Route } from 'react-router-dom';

import Products from './products/products';
import Product from './products/product'


export default function App()  {

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>
      </Switch>
    </div>
  );

}