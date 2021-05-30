import React from 'react';
import { useSelector } from 'react-redux';

import { GlobalReduxState } from './redux/GlobalReducer';
import Router from './router/Router';

const RouterProvider: React.FC = () => {
  const signing = useSelector((state: GlobalReduxState) => state.app.signing);

  return <Router signing={signing} />;
};

export default RouterProvider;
