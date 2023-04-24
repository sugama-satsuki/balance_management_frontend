
import { LoginErrorActionType, LoginStartActionType, LoginSuccessActionType } from '../../domain/entity/login';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const actions = {
    init: actionCreator('INIT'),
    loginStartFeeds: actionCreator<LoginStartActionType>('LOGIN_START'),
    loginSuccessFeeds: actionCreator<LoginSuccessActionType>('LOGIN_SUCCESS'),
    loginErrorFeeds: actionCreator<LoginErrorActionType>('LOGIN_ERROR')
}

export default actions;