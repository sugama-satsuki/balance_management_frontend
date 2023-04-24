// import React, { createContext, useReducer } from "react"
// import AuthReducer from './AuthReducer';
// import { reducerWithInitialState } from 'typescript-fsa-reducers';


// // 最初のユーザー状態を定義
// const initialState = {
//     user: null,
//     isFetching: false,
//     err: false,
// }


// // TODO： https://zenn.dev/sorye/articles/usereducer-practice 
// // TODO:TSとRedux https://www.techpit.jp/courses/81/curriculums/84/sections/634/parts/2207
// // https://qiita.com/m0a/items/703d64c74e43cb392a64

// // 状態をグローバルに管理する
// export const AuthContext = createContext(initialState);

// export const AuthContextProvider = (children: React.ReactNode) => {
//     // useReducer(Reducer関数, 初期値状態)
//     // 昔の状態を新しい状態に変更する
//     const [state, dispatch] = useReducer(AuthReducer, initialState);

//     // return(
//     //     <AuthContext.Provider value={{
//     //         user: state.user,
//     //         isFetching: state.isFetching,
//     //         err: state.err,
//     //         dispatch
//     //     }}>
//     //         { children }
//     //     </AuthContext.Provider>
//     // )
// }