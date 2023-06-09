import React from 'react';
// import styled from 'styled-components';

/* import css */
import styles from './msgBanner.module.css';

/* import icon */
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

import { fields } from '../../../assets/fields';
import { MsgType } from '../../../types/global';


type PropsType = {
    text?: string,
    msgType: 's' | 'e',
    msgNum: MsgType,
    show: boolean,
    onClickFunc: (e: any) => void
}

export default function MsgBanner(props: PropsType) {

    const { text, msgType, msgNum, show, onClickFunc } = props;
    
    return (
        <div className={`${styles.msgBnr} ${show? styles.show : styles.hide} ${msgType === 'e' ? styles.errorColor : styles.successColor }`}
            onClick={onClickFunc}>
            { msgType === 'e' ? <WarningIcon className={styles.icon}/> : <InfoIcon className={styles.icon}/>}
            { fields.messageList[msgNum].msg }
        </div>
    )
}