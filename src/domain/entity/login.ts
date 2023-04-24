// typeの定義

export type UserDataType = {
    password: string,
    email: string
}

export type LoginStartActionType = { type: 'LOGIN_START' };
export type LoginSuccessActionType = {
        type: 'LOGIN_SUCCESS',
        payload: UserDataType
    };
export type LoginErrorActionType = {
        type: 'LOGIN_ERROR',
        payload: string | unknown
    };

export type StateType = {
    user: null | UserDataType,
    isFetching: boolean,
    err: string | unknown | boolean,
}