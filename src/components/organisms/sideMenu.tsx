import React, {ReactNode} from "react";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

/* import css */ 
import '../../styles/sideMenu.css';
import styles from '../../styles/sideMenuButton.module.css';

/* import atoms */ 
import SideMenuButton from "../atoms/sideMenuButton";

/* import mui icons */ 
import HomeIcon from '@mui/icons-material/Home';
import BiotechIcon from '@mui/icons-material/Biotech';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';


type Props = {
    logo?: ReactNode,
    userName: string,
    userIcon: string,
    menuState: number,
    changeMenuState: Function,
    isOpen: boolean,
    onClickMenuIcon: Function,
    menuNumber: number
}

export default function MySideMenu(props: Props) {

    // props展開
    const { logo, userName, userIcon, isOpen, onClickMenuIcon, menuNumber } = props;

    // // stateの宣言
    // const [isOpen, setIsOpen] = useState(false);
    const [menuState, setMenuState] = React.useState(menuNumber);


    // // アクション宣言
    // function onClickMenuIcon() {
    //     setIsOpen(!isOpen)
    // }

    const onClickMenuButton = (e: React.MouseEvent<HTMLAnchorElement>, num:number) => {
        setMenuState(num);
    }


    return(
        <div className={`${'sideMenu'} ${isOpen ? 'sideMenuOpen' : 'sideMenuClose'}`}>
            <div className='sideMenuInnerWrapper'>
                {/* メニュー開け閉めボタン */}
                <div className='menuIcon' onClick={() => {onClickMenuIcon()}}>
                    <span></span><span></span>
                </div>

                {/* ユーザーインフォ */}
                <div className={`${'userInfo'} ${isOpen ? 'open' : 'close'}`}>
                    <div className='userInfoInnerWrapper'>
                        <span className='userIcon'>
                            {userIcon === '' ? <AccountCircleIcon style={{fontSize:'2.5rem'}} /> : <img src={userIcon} alt=''/> }
                        </span>
                        <span className='userName'>{userName}</span>
                    </div>
                    <span className='logoutIcon'><LogoutIcon /></span>
                </div>

                {/* ナビゲーションメニュー */}
                <div className='navigationWrapper'>
                    <SideMenuButton text="ダッシュボード" url="/" isSelect={menuState === 1} onClick={onClickMenuButton} isMenuOpen={isOpen} num={1} key={1}>
                        <HomeIcon />
                    </SideMenuButton>
                    <SideMenuButton text="一覧" url="/list" isSelect={menuState === 2} onClick={onClickMenuButton} isMenuOpen={isOpen} num={2} key={2}>
                        <ListAltIcon />
                    </SideMenuButton>
                </div>
                {/* メニューフッターロゴ */}
                <div className='logoWrapper'>
                    {logo}
                </div>
            </div>
        </div>
    )
}