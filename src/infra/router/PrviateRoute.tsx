/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  redirectPath: string;
  signing: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  signing,
  redirectPath,
  location,
  ...rest
}) => {
  const render = (Component: any) => (props: RouteProps) => {
    return (signing
      ? <Component {...props} />
      : <Redirect to={{ pathname: redirectPath, state: { from: location } }} />);
  };

  return <Route {...rest} render={render(component)} />;
};

export default PrivateRoute;
