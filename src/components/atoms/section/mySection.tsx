import React, {ReactNode} from 'react';

/* import css */ 
import styles from './mySection.module.css';


type Props = {
    children: ReactNode,
    title: string,
    dark?: boolean,
    radiusS?: boolean
}

export default function MySection(props: Props) {

    const {children, title, dark, radiusS} = props;

    return(
        <div className={`${styles.mySection} ${dark ? styles.bgDark : styles.bgLight} ${radiusS ? styles.borderRadiusS : styles.borderRadiusM}`}>
            <div className={styles.title}>{ title }</div>
            <div className={styles.content}>{ children }</div>
        </div>
    )
}