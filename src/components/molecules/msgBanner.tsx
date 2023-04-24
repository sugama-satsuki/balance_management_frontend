import React from 'react';
// import styled from 'styled-components';

/* import css */
import styles from '../../styles/molecules/msgBanner.module.css';

/* import icon */
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';



// 0~2:成功、3:特殊文字を含む、4:入力タイプが違う、5:必須項目が空
type MsgType = 0 | 1 | 2 | 3 | 4 | 5

type PropsType = {
    text?: string[],
    msgType: 's' | 'e',
    msgNum: MsgType,
    show: boolean,
    onClickFunc: (e: any) => void
}

export default function MsgBanner(props: PropsType) {

    const { text, msgType, msgNum, show, onClickFunc } = props;
    // const textArr = text === undefined ? [''] : text;

    const messageList = [
        '正常に登録しました。',
        '正常に更新しました。',
        '正常に削除しました。',
        // textArr[0] + 'に特殊文字が入力されました。',
        '●●に特殊文字が入力されました。',
        // textArr[0] + 'には' + textArr[1] + 'のみ入力できます。',
        '〇〇には▲▲のみ入力できます。',
        '〇〇が空です。必ず入力してください。' 
    ]

    return (
        <div className={`${styles.msgBnr} ${show? styles.show : styles.hide} ${msgType === 'e' ? styles.errorColor : styles.successColor }`}
            onClick={onClickFunc}>
            { msgType === 'e' ? <WarningIcon className={styles.icon}/> : <InfoIcon className={styles.icon}/>}
            { messageList[msgNum] }
        </div>
    )
}