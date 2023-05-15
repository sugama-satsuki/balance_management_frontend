import React, {ReactNode} from "react";

/* import css */ 
import styles from './sideMenuButton.module.css';


type Props = {
    text: string,
    url: string,
    isSelect: boolean,
    isMenuOpen: boolean,
    onClick: Function,
    children: ReactNode,
    num: number
}

export default function SideMenuButton(props: Props) {

    const { text, url, isSelect, isMenuOpen, children, onClick, num } = props;

    function menuButtonOnClick(e: React.MouseEvent<HTMLAnchorElement>, num:number) {
        onClick(e, num);
    }

    return(
        <div className={`${styles.sideMenuButton} ${isSelect ? styles.btnSelect : styles.btnNotSelect} ${isMenuOpen ? styles.btnOpen : styles.btnClose}`}>
            <a href={url} onClick={(e) => { menuButtonOnClick(e, num) }}>
                <span>{children}</span>
                <span className={styles.buttonText}>{text}</span>
            </a>
        </div>
    )
}