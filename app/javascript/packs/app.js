import React from "react"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './home'

export default function App()  {

  return (
    <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );

}