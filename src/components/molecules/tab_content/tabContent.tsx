import React from 'react';

/* import css */ 
import styles from './tabContent.module.css';


type MyTabsProps = {
    tabItems: {text: string, id: string}[],
    borderColor: string,
    parentEvent: Function,
    selectValue: string
}

export function VerticalTabs() {

}


export function HorizontalTabs(props: MyTabsProps) {
    const { tabItems, parentEvent, borderColor, selectValue } = props;

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
        parentEvent(e.currentTarget.id);
    };
    

    return(
        <div className={styles.tabs}>
            {tabItems.map((item, index) => {
                return (
                    <button key={index} id={item.id} onClick={handleChange} style={{ borderBottomColor: borderColor }} 
                        className={`${item.id === selectValue && styles.isSelect }`}>
                            {item.text}
                    </button>
                )
            })}
        </div>
    )
}