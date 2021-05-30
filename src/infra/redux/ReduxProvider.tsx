import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import setReduxStore, { history } from './GlobalStore';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const mainStore = setReduxStore();

const ReduxProvider: React.FC<ReduxProviderProps> = ({
  children
}) => {
  return (
    <Provider store={mainStore.store}>
      <PersistGate loading={null} persistor={mainStore.persist}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
