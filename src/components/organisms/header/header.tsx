import React from "react";

/* import css */ 
import styles from './header.module.css';

/* import mui */ 
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

/* import molecules */ 
import SearchBar from '../../molecules/search_bar/searchBar';

/* import atom */ 
import Logo from "../../atoms/logo/logo";


export default function Header() {

    return(
        <div className={styles.header}>
            <div className={styles.headerInnerWrapper}>
                <Logo />
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