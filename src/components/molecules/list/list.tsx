import React from "react";

/* import css */ 
import styles from './list.module.css';

type Props = {
    items: {title: string, description?: string, icon?: React.ReactNode}[],
    showHeader?: boolean,
    headerData?: string
}

export default function ListWithIcon(props: Props){

    const {items, showHeader, headerData} =  props;

    return(
        <ul className={styles.listWrapper}>
            { showHeader && <li className={styles.header}> { headerData } </li> }
            {
                items.length === 0 ? 
                    <span>表示するデータがありません。</span>
                :
                    items.map((item, index) => {
                        return(
                            <li key={index}>
                                <span className={styles.leftContent}>
                                    {item.icon && 
                                        <span className={styles.iconWrapper}>
                                            { item.icon }
                                        </span>
                                    }
                                    <span className={styles.title}>{item.title}</span>
                                </span>
                                <span>{item.description}</span>
                            </li>
                        )
                    })
            }
        </ul>
    )
}
