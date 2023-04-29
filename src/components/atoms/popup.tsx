import React, { useState } from 'react';

/* import css */
import styles from '../../styles/atoms/popup.module.css';

/* import mui */ 
import CloseIcon from '@mui/icons-material/Close';


type Props = {
    children: React.ReactNode,
    size: 's'|'m'|'l',
    overflowHd?: boolean,            // overflow:hiddenを設定,
    onClick: () => void,
    openFlag: boolean
}

export default function Popup(props: Props) {

    const { children, size, overflowHd, onClick, openFlag } = props;

    const onClickLabel = () => {
        onClick();
    }

    return(
        <>
            <div className={`${styles.popupWrapper} ${openFlag && styles.open }`}>
                <label htmlFor="popupTrigger" className={styles.popupTrigger} onClick={onClickLabel}></label>
                <div className={`${styles.popupContent} 
                    ${size === 's' ? styles.popupS : size === 'l' ? styles.popupL : styles.popupM} 
                    ${overflowHd ? styles.hidden : styles.scroll}`}
                >
                    <label htmlFor="popupTrigger" className={styles.closeButton} id='closeBtn' onClick={onClickLabel}>
                        <CloseIcon />
                    </label>
                    { children }
                </div>
            </div>
        </>
    )
}