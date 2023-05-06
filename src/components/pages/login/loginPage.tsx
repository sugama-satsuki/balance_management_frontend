import React, { useRef, useReducer } from 'react';

// import {loginReducer} from '../../../store/login/AuthReducer';

import axios from 'axios';

/* import css */
import styles from './loginPage.module.css';

/* import mui data-grid */
import { jaJP } from '@mui/x-data-grid';

/* import material-ui */ 
import { createTheme } from '@material-ui/core';

/* import atoms */ 
import { SquareButton } from '../../atoms/button/button';
import Spacer from '../../atoms/spacer/spacer';




// 最初のユーザー状態を定義
const initialState = {
    user: null,
    isFetching: false,
    err: false,
  }
  
type UserDataType = {
    password: string,
    email: string
}


export default function LoginPage() {

    // inputの入力値を監視
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    // const [state, dispatch] = useReducer(loginReducer, initialState);


    // * -- ログインボタン押下時処理 -- *
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        // ボタン押下時リロードしない
        event.preventDefault();
        // inputのcurrent属性を表示
        // loginCall(
        //     {
        //         email: !email.current?.value ? '' : email.current?.value,
        //         password: !password.current?.value ? '' : password.current?.value
        //     },
        //     dispatch
        // )
    }

    // * -- 「初めての人はこちら」ボタン押下時処理 -- *
    const onClickMoveSignUpPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        // 画面遷移
        let signUpWin = window.open('/userRegister');
    }


    // * -- ログイン処理 -- *
    const loginCall =  async (user:UserDataType, dispatch: Function) => {
        dispatch({type: 'LOGIN_START'});

        // ログインできたら
        try{
            const res = await axios.post('/auth/login', user);
            console.log(res.data)
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
        }catch(err) {
            dispatch({type: 'LOGIN_ERROR', payload: err});
        }
    }

    

    return(
        <div className={styles.pageWrapper}>
            <form className={styles.pageInner}>
                <p className={styles.title}>ログイン</p>
                <Spacer size='l'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>ユーザー名</p>
                        <input type='email' className={styles.input} required placeholder='メールアドレス' ref={email} />
                    </div>
                </Spacer>
                <Spacer size='s'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>パスワード</p>
                        <input type='password' className={styles.input} required placeholder='パスワード' minLength={6} ref={password}/>
                    </div>
                </Spacer>
                <Spacer size='m'>
                    <div className={styles.buttonArea}>
                        <SquareButton text='ログイン' type={'submit'} fill onClick={handleSubmit}/>
                        <Spacer size='xs'>
                            <SquareButton text='初めての方はこちら' fill onClick={onClickMoveSignUpPage} secondary />
                        </Spacer>
                        <a href={""} className={styles.signUp}>パスワードを忘れた方</a>
                    </div>
                </Spacer>
            </form>
        </div>
    )
}


const theme = createTheme({}, jaJP)