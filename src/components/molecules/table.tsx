import React from 'react';

// import css
import styles from '../../styles/molecules/table.module.css'


type Props = {
    items: React.ReactNode[][],
    itemWidth: number[],
    showCheckBox?: boolean
}

export default function MyTable(props: Props) {

    const { items, itemWidth, showCheckBox } = props;

    const cellSize:string[] = [
        styles.cellS,
        styles.cellM,
        styles.cellL,
        styles.cellXl,
        styles.cellXxl,
        styles.cellFill
    ]

    return(
        <div className={styles.myTable}>
            { items.map((row, i) => {
                return <div className={styles.row} key={i}>
                            {
                            // チェックボックスを表示する？ 1行目だったらHeader
                            showCheckBox && i === 0 ? 
                            <div className={`${styles.tableHeader} ${styles.cellS} ${styles.headCheckboxCell}`} key={i}><input type='checkbox'/></div> 
                            :<div className={`${styles.cell} ${styles.cellS}`} key={i}><input type='checkbox'/></div> 
                            }

                            { row.map((cell, j) => {
                                  return( 
                                    // 1行目だったらHeader
                                    i === 0 ? 
                                        <div className={`${styles.tableHeader} ${cellSize[itemWidth[j]]}`} key={j}>{cell}</div>
                                        :<div className={`${styles.cell} ${cellSize[itemWidth[j]]}`} key={j}>{cell}</div> 
                                  );
                              }) 
                            }
                       </div>
            }) }
        </div>
    )
}