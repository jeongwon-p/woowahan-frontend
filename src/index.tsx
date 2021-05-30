import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import './index.css';
import ReduxProvider from './infra/redux/ReduxProvider';
import ThemeProvider from './infra/ThemeProvider';
import RouterProvider from './infra/RouterProvider';

const Root: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <ReduxProvider>
        <ThemeProvider>
          <RouterProvider />
        </ThemeProvider>
      </ReduxProvider>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
