import React, {ReactNode} from "react";

/* import css */ 
import styles from './spacer.module.css';


type Props = {
    children: ReactNode,
    size: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export default function Spacer(props:Props) {

    const {children, size} = props;

    return(
        <div className={`${size === 'xs' ? styles.spacerXs : size === 's' ? styles.spacerS : size === 'm' ? styles.spacerM : size === 'l' ? styles.spacerL : styles.spacerXL}`}>
            {children}
        </div>
    )
}