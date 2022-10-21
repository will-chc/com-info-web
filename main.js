import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createRoutes from './src/routes/routes.js';
import routeWhiteList from './src/routes/routeWhitelist'
import definedRoutes from './src/routes/definedRoutes'

render(
  (
    <React.StrictMode>
      <Router>
        {createRoutes(routeWhiteList,definedRoutes)}
      </Router>
    </React.StrictMode>
  ),
  document.getElementById('root')
)