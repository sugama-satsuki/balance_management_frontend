import React from "react";
import { useState } from "react";
import styles from '../../styles/list.module.css';

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
