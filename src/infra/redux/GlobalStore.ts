import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';

import createRootReducer from './GlobalReducer';

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  // preload state,
  composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);
const persist = persistStore(store);

export default () => {
  return { store, persist };
};
