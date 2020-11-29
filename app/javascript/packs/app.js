import React from "react"

import { Switch, Route } from 'react-router-dom';

import Products from './products/products';
import Product from './products/product'
import NewProduct from './products/new-product'

import Components from './components/components';


export default function App()  {

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/new">
          <NewProduct />
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>

        <Route exact path="/components">
          <Components />
        </Route>
      </Switch>
    </div>
  );

}