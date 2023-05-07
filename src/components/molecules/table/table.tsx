import React from 'react';

/* import css */
import styles from './table.module.css'

import { DataStateType } from '../../../settingDataType';

import { format } from 'date-fns';


type Props = {
    items: DataStateType[],
    itemWidth: number[],
    showCheckBox?: boolean,
    name: string,
    allCheckFunc: (checkFlag: boolean) => void,
    cellCheckFunc: (num: number, checkFlag: boolean) => void,
    onClickTableRow: (data: DataStateType) => void
}

export default function MyTable(props: Props) {

    const { items, itemWidth, name, allCheckFunc, cellCheckFunc, onClickTableRow } = props;


    const cellSize:string[] = [
        styles.cellS,
        styles.cellM,
        styles.cellL,
        styles.cellXl,
        styles.cellXxl,
        styles.cellFill
    ]

    const onClickRow = (i: number, data: DataStateType) => {
        // headerじゃなかったら、動作する
        if(i > 0){
            onClickTableRow(data);
        }
    }


    return(
        <div className={styles.myTable}>
            {
              items.map((row:DataStateType, i:number) => {
                return(
                    <div className={styles.row} key={i} >
                        { row.map((cell, j) => {
                            return(
                                // 1行目だったらHeader
                                j > 0 &&
                                    <div 
                                        className={`
                                            ${ i === 0 ? styles.tableHeader : styles.cell } 
                                            ${cellSize[itemWidth[j]]} 
                                            ${ j === 1 && styles.headCheckboxCell}
                                         `} 
                                        key={j}
                                        onClick={() => j > 1 && onClickRow(i, row)}
                                    >
                                        {  j === 1 ?
                                            <input 
                                                type='checkbox' 
                                                id={ i === 0 ? name +'headerCheckBox' : name + 'CheckBox' + i} 
                                                onChange={() => i === 0 ? allCheckFunc(cell) : cellCheckFunc(row[0], cell)} 
                                                checked={cell}
                                            />
                                            : isNaN(new Date(cell).getDate()) ? cell : format(new Date(cell), 'yyyy/MM/dd')
                                        }
                                    </div>
                            );
                            })
                        }
                    </div>
                )
              })
            }
            { items.length === 1 && <div>表示するデータがありません。</div> }
        </div>
    )
}