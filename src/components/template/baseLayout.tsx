import React from 'react';

// import css
import styles from '../../styles/template/baseLayout.module.css'

// import organisms
import Header from '../organisms/header';
import MySideMenu from '../organisms/sideMenu';
import { PageTitle } from '../atoms/title';
import Spacer from '../atoms/spacer';



type Props = {
    children: React.ReactNode,
    menuNumber: number,
    pageTitle: string
}

export default function BaseLayout(props:Props){

    const { children, menuNumber, pageTitle } = props;

    // stateの宣言
    const [isOpen, setIsOpen] = React.useState(false);
    const [menuState, setMenuState] = React.useState(menuNumber);


    // アクション宣言
    function onClickMenuIcon() {
        setIsOpen(!isOpen)
    }

    const onChangeMenuState = (e: React.MouseEvent<HTMLAnchorElement>, num: number) => {
        setMenuState(num);
        e.stopPropagation();
    }


    return(
        <div>
            <Header />
            <MySideMenu userName='satsuki' userIcon='' menuState={menuState} isOpen={isOpen} menuNumber={menuNumber}
                changeMenuState={onChangeMenuState} onClickMenuIcon={onClickMenuIcon}
            />
            <div className={styles.mainContentsWrapper}>
                <div className={styles.mainContentInner}>
                    <PageTitle title={pageTitle} />
                    <Spacer size='m'>{children}</Spacer>
                </div>
            </div>
        </div>
    )
}