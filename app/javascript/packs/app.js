import React from "react"

import { Switch, Route } from 'react-router-dom'

import Home from './home'
import Test from './test'


export default function App()  {

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </Switch>
    </div>
  );

}