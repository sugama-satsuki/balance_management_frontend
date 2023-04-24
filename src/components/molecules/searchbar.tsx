import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import styles from '../../styles/searchbar.module.css';

export default function SearchBar() {

    return(
        <div className={styles.searchBar}>
            <SearchIcon />
            <input type="text" />
        </div>
    )
}