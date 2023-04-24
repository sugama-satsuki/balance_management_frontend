import React, { ReactNode } from "react";
import { useState } from "react";
import styles from '../styles/iconButton.module.css';


type Props = {
    title: string, 
    text?: string, 
    url?: string, 
    children: ReactNode
}

export default function IconTopButton(props:Props) {

    const {title, text, url, children} = props;

    return(
        <a href={url} className={styles.iconTopButton}>
            <span className={styles.icon}>{children}</span>
            <span className={styles.title}>{title}</span>
            <span className={styles.text}>{text}</span>
        </a>
    )
}