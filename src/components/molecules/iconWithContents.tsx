import React from 'react';

/* import css */
import styles from '../../styles/iconWithContents.module.css';

/* import atoms */ 
import { ContentsTitle } from '../atoms/title';


type IconWithTitleProps = {
    title: string,
    subTitle?: string,
    icon: React.ReactNode,
    iconCircle?: boolean,
    secondary?: boolean,
    customColor?: string
}

export function IconWithTitle(props: IconWithTitleProps) {

    const { title, subTitle, icon, iconCircle, secondary, customColor } = props;

    return(
        <div className={styles.iconWithTitleWrapper}>
            { iconCircle ? 
                <div className={`${styles.circleIcon } ${ styles.icon } ${ secondary ? styles.iconBgColorSecondary : styles.iconBgColorPrimary }`}>{icon}</div>
                :<div className={`${ styles.icon } ${ secondary ? styles.iconColorSecondary : styles.iconColorPrimary }`}>{icon}</div>
            }
            <ContentsTitle title={title} subTitle={subTitle} titleBottom />
        </div>
    )
}