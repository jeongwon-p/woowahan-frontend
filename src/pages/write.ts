import { ActionType, createAction, createReducer } from 'typesafe-actions';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const actions = {
  initialize: createAction(INITIALIZE)(),
  changeField: createAction(CHANGE_FIELD)<{ key: string, value: string }>()
};

type AppAction = ActionType<typeof actions>;

/* Redux state */
export interface WriteReduxState {
  title: any;
  body: any;
}

const initialState: WriteReduxState = {
  title: '',
  body: ''
};

const write = createReducer<WriteReduxState, AppAction>(initialState)
  .handleAction(actions.initialize, (state) => ({
    ...state
  }))
  .handleAction(actions.changeField, (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value
  }));

export default write;
