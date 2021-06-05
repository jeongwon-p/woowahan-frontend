import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';

import app, { AppReduxState } from './AppWidgets';
import write, { WriteReduxState } from '../../pages/write';

export interface GlobalReduxState {
  app: AppReduxState;
  write: WriteReduxState;
}

// 모든 Reducer 는 개발 후, 아래 Root reducer 에 레퍼런스를 넣어주어야 합니다.
// 해당 작업을 통해 Reducer 는 Redux 의 관리하에 들어갑니다.
const createRootReducer = (history: any) => combineReducers({
  app,
  write,
  router: connectRouter(history)
});

// SPA 아키텍처는 새로고침에 대한 Redux state 들의 상태 보존을 지원해 주지 않습니다.
// react-persist 를 통해 새로고침을 하더라도, 현재 존재하는 redux 상태들을 보존할 수 있게 됩니다.
export const persistConfig = {
  storage,
  key: 'root',
  blacklist: []
};

export default (routeHistory: any) => persistReducer(persistConfig, createRootReducer(routeHistory));
