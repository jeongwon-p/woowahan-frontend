import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrviateRoute';

import NotFound from '../../pages/NotFound';
import Home from '../../pages/Home';
import Sign from '../../pages/Sign';

interface RouterProps {
  signing: boolean;
}

const Router: React.FC<RouterProps> = ({ signing }) => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={Home} path='/' redirectPath='/sign' signing={signing} exact />
        <Route component={Sign} path='/sign' />
        <Route component={NotFound} path='*' />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
