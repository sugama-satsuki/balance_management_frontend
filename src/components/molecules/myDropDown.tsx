import styled from '@emotion/styled';
import React, { ChangeEventHandler } from 'react';

/* import css */
import styles from '../../styles/molecules/myDropDown.module.css';


type PropsType = {
    items: {label:string,value:string}[],
    changeFunc: ChangeEventHandler<HTMLSelectElement>,
    name: string
}

export default function MyDropDown(props: PropsType) {

    const { items, changeFunc, name } = props;

    return(
        <select name={name} onChange={changeFunc} className={styles.my_dropdown}>
            { items.map((item:{label:string,value:string}, index:number) => {
                return (
                    <option value={item.value} key={index}>{item.label}</option>
                )
              })
            }
        </select>
    )
}