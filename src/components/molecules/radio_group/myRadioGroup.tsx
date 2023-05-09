import React, { ChangeEventHandler } from 'react';

/* import css */
import styles from './myRadioGroup.module.css';


type PropsType = {
    items: {label:string,value:string}[],
    groupName: string,
    isRow?: boolean,                 // 縦並びかどうか
    changeFunc: ChangeEventHandler,
    selectValue: string,
}


export default function MyRadioGroup(props: PropsType) {

    const { items, groupName, isRow, changeFunc, selectValue } = props;

    return(
        <div className={`${styles.radio_group} ${isRow ? styles.flex_column : styles.flex_row}`}>
            { items.map((item:{label:string,value:string}, index:number) => {
                return (
                    <div key={index} >
                        <input type="radio" 
                            id={item.value} name={groupName} 
                            value={item.value}
                            checked={item.value === selectValue}
                            onChange={changeFunc}
                        />
                        <label htmlFor={item.value}>{item.label}</label>
                    </div>
                )
              })
            }
        </div>
    )
}