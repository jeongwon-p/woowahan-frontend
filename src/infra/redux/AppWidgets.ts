import { ActionType, createAction, createReducer } from 'typesafe-actions';

/* Action */
const SIGN_IN_ACCESS = 'app/SIGN_IN_SUCCESS';
const SIGN_OUT = 'app/SIGN_OUT';

export const actions = {
  signInSuccess: createAction(SIGN_IN_ACCESS)<{ token: string, emailId: string }>(),
  signOut: createAction(SIGN_OUT)()
};

type AppAction = ActionType<typeof actions>;

/* Redux state */
export interface AppReduxState {
  signing: boolean;
  emailId: string;
  token: string;
}

const initialState: AppReduxState = {
  signing: false,
  emailId: '',
  token: ''
};

/* Reducer */
const reducer = createReducer<AppReduxState, AppAction>(initialState)
  .handleAction(actions.signInSuccess, (state, action) => ({
    ...state,
    signing: true,
    emailId: action.payload.emailId,
    token: action.payload.token
  }))
  .handleAction(actions.signOut, (state) => ({
    ...state,
    emailId: '',
    signing: false
  }));

export default reducer;
