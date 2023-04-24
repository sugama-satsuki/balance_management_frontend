import React from "react";
import { useState } from "react";
import styles from '../../styles/header.module.css';
import SearchBar from '../molecules/searchbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';


export default function Header() {


    return(
        <div className={styles.header}>
            <div className={styles.headerInnerWrapper}>
                <SearchBar />
                <div className={styles.userInfo}>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsIcon className={styles.notification}/>
                    </Badge>
                </div>
            </div>
        </div>
    )
}