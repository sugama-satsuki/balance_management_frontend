import React from "react";

/* import css */ 
import styles from './list.module.css';

type Props = {
    items: {title: string, description?: string, img: string}[]
}

export default function ListWithIcon(props: Props){

    const {items} =  props;

    return(
        <ul className={styles.listWrapper}>
            {items.map((item, index) => {
                return(
                    <li key={index}>
                        {item.img === '' && 
                            <span className={styles.img}>
                                <img src={item.img} alt={item.img} />
                            </span>
                        }
                        <span>{item.title}</span>
                        <span>{item.description}</span>
                    </li>
                )
            })}
        </ul>
    )
}
