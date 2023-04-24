import { createStoreHook } from "react-redux";
import { combineReducers } from "redux";
import { loginReducer } from "./login/AuthReducer";
import { RootState } from "../domain/entity/rootState";


// const store = createStoreHook(
//     combineReducers<RootState>({
//         loginInfo: loginReducer
//     })
// )