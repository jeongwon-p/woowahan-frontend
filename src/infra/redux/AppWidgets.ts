import { ActionType, createAction, createReducer } from 'typesafe-actions';

/* Action */
const SIGN_IN_ACCESS = 'app/SIGN_IN_SUCCESS';
const SIGN_OUT = 'app/SIGN_OUT';

export const actions = {
  signInSuccess: createAction(SIGN_IN_ACCESS)<{ token: string }>(),
  signOut: createAction(SIGN_OUT)()
};

type AppAction = ActionType<typeof actions>;

/* Redux state */
export interface AppReduxState {
  signing: boolean;
  token: string;
}

const initialState: AppReduxState = {
  signing: false,
  token: ''
};

/* Reducer */
const reducer = createReducer<AppReduxState, AppAction>(initialState)
  .handleAction(actions.signInSuccess, (state, action) => ({
    ...state,
    signing: true,
    token: action.payload.token
  }))
  .handleAction(actions.signOut, (state) => ({
    ...state,
    signing: true
  }));

export default reducer;
