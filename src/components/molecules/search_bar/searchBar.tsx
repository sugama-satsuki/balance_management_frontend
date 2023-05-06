import React from "react";

/* import css */ 
import styles from './searchBar.module.css';

/* import mui */ 
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {

    return(
        <div className={styles.searchBar}>
            <SearchIcon />
            <input type="text" />
        </div>
    )
}