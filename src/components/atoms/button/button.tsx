import React from "react";

/* import css */ 
import styles from './button.module.css';


type Props = {
    text: string,
    onClick: Function,
    type?: 'button' | 'submit' | 'reset' | undefined,
    secondary?: boolean,
    fill?: boolean
}



export function SquareButton(props: Props) {

    const { text, onClick, type, secondary, fill } = props;

    function onClickButton(e : React.MouseEvent<HTMLButtonElement>) {
        onClick();
    }

    return (
        <button onClick={onClickButton} 
            className={`${ styles.squareButton } ${ secondary ? styles.primary : styles.secondary } ${fill && styles.fill}`}
            type={ type }
        >{text}</button>
    )
}