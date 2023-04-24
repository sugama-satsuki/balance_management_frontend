import React from 'react';

/* import css */
import styles from '../../styles/atoms/popup.module.css';


type Props = {
    children: React.ReactNode,
    size: 's'|'m'|'l',
    overflowHd?: boolean            // overflow:hiddenを設定
}

export default function Popup(props: Props) {

    const { children, size, overflowHd } = props;

    return(
        <>
            <input type='checkbox' id='trigger' className={ styles.checkbox }/>
            <div className={`${styles.popupWrapper}`}>
                <label htmlFor="trigger" className={styles.popupTrigger}></label>
                <div className={`${styles.popupContent} 
                    ${size === 's' ? styles.popupS : size === 'l' ? styles.popupL : styles.popupM} 
                    ${overflowHd ? styles.hidden : styles.scroll}`}
                >
                    <label htmlFor="trigger" className={styles.closeButton}>✖️</label>
                    { children }
                </div>
            </div>
        </>
    )
}