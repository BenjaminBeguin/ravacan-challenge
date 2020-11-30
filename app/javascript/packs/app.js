import React from "react"

import { Switch, Route } from 'react-router-dom';

import Products from './products/products';
import Product from './products/product'
import NewProduct from './products/new-product'
import EditProduct from './products/edit-product'

import Components from './components/components';


export default function App()  {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/products" component={Products} />
        

        <Route exact path="/products/new" component={NewProduct} />
        <Route path="/products/:id/edit" component={EditProduct} />
        <Route path="/products/:id" component={Product} />



        <Route exact path="/components" component={Components} />
      </Switch>
    </div>
  );

}