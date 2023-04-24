import styled from '@emotion/styled';
import React, { ChangeEventHandler } from 'react';

/* import css */
import styles from '../../styles/molecules/myRadioGroup.module.css';


type PropsType = {
    items: {label:string,value:string}[],
    groupName: string,
    isRow?: boolean,                 // 縦並びかどうか
    changeFunc: ChangeEventHandler,
    selectValue: string,
}

/* 
 TODO:
 ・onChangeを受け取る
 ・stateを受け取る
 ・checked属性を設定（stateと一致してたらチェックつける）
*/  

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