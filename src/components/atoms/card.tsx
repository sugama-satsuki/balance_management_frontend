import React, { ReactNode } from "react";
import styles from '../../styles/card.module.css';


type Props = {
    children: ReactNode,
    darkMode: boolean,
    width: string,
    dropDownItems?: {text: string, value: number}[],
    dropDownSelectVal?: number,
    name?: string,
    customCss?: string,
    bgCustomColor?: string
}

export default function MyCard(props:Props) {
    const {children,  darkMode, width, dropDownItems, dropDownSelectVal, name, customCss, bgCustomColor} = props;
    
    return(
        <div 
            className={`${styles.myCard} ${darkMode ? styles.dark : styles.light} ${customCss&&customCss}`}
            style={{width: width, backgroundColor: bgCustomColor}}
        >
            { dropDownItems && 
                <select name={name}>
                    {
                        dropDownItems.map((item, index) => {
                            return item.value === dropDownSelectVal ? 
                                <option value={item.value} label={item.text} key={index} selected>{item.text}</option>:
                                <option value={item.value} label={item.text} key={index}>{item.text}</option>
                        })
                    }
                </select>
            }
            {children}
        </div>
    )
}