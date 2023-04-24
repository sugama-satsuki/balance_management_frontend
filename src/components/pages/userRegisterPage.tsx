import React from 'react';

/* import css */
import styles from '../../styles/page/loginPage.module.css';

/* import mui data-grid */
import { jaJP } from '@mui/x-data-grid';

/* import material-ui */ 
import { createTheme } from '@material-ui/core';

/* import atoms */ 
import { SquareButton } from '../atoms/button';
import Spacer from '../atoms/spacer';

import axios from 'axios';



type UserInfoType = {
    userName: string,
    password: string,
    email: string
}

// TODO: メッセージバナーコンポーネントの作成


export default function UserRegisterPage() {

    // inputの入力値を監視
    const userName = React.useRef<HTMLInputElement>(null);
    const email = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);
    const confirmPass = React.useRef<HTMLInputElement>(null);

    let showMessage: boolean = false;


    // * -- ログインボタン押下時処理 -- *
    const onClickSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('onClick new data');
        event.preventDefault();

        // パスワードが確認用のパスワードと一致してたら登録
        if(password.current?.value === confirmPass.current?.value) {
            // 登録
            userRegister({
                userName: !userName.current?.value ? '' : userName.current?.value,
                password: !password.current?.value ? '' : password.current?.value,
                email: !email.current?.value ? '' : email.current.value
            })
        }else {
            showMessage = true
        }
    }


    const userRegister = async (userInfo: UserInfoType) =>  {

        if(userInfo.email !== '' && userInfo.email !== '' && userInfo.password !== ''){
            const user = await axios.post('/auth/register');
            if(!user) showMessage = true;
        }
        showMessage = true;
    }


    return(
        <div className={styles.pageWrapper}>
            <form className={`${styles.pageInner} ${styles.pageInnerL}`}>
                <p className={styles.title}>新規登録</p>
                <Spacer size='l'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>ユーザー名</p>
                        <input type='text' className={styles.input} required placeholder='メールアドレス' ref={userName} />
                    </div>
                </Spacer>
                <Spacer size='s'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>メールアドレス</p>
                        <input type='email' className={styles.input} required placeholder='メールアドレス' ref={email} />
                    </div>
                </Spacer>
                <Spacer size='s'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>パスワード</p>
                        <input type='password' className={styles.input} required placeholder='メールアドレス' ref={password} />
                    </div>
                </Spacer>
                <Spacer size='s'>
                    <div className={styles.inputWidget}>
                        <p className={styles.label}>パスワード（確認用）</p>
                        <input type='password' className={styles.input} required placeholder='メールアドレス' ref={confirmPass} />
                    </div>
                </Spacer>
                <div className={styles.buttonArea}>
                    <SquareButton text='新規登録' fill onClick={onClickSignUp}/>
                </div>
            </form>
        </div>
    )
}


const theme = createTheme({}, jaJP)