
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { LoginStartActionType, LoginSuccessActionType, LoginErrorActionType, StateType } from '../../domain/entity/login';
import actions from './AuthActions';



const init: StateType = {
    user: null,
    isFetching: false,
    err: false
}

export const loginReducer = reducerWithInitialState(init).case(
    actions.loginStartFeeds,
    (state, payload) => ({
      ...state,
      ...payload
    })
  ).case(
    actions.loginSuccessFeeds,
    (state, payload) => ({
      ...state,
      ...payload
    })
  ).case(
    actions.loginErrorFeeds,
    (state, payload) => ({
      ...state,
      ...payload
    })
  );

