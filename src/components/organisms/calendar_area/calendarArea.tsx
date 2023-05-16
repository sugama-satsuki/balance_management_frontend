import React from "react";

/* import css */
import styles from './calendarArea.module.css'; 

/* import mui */ 
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KebabDiningIcon from '@mui/icons-material/KebabDining';

/* import atoms */ 
import MyCard from "../../atoms/card/card";

/* import molecules */ 
import ListWithIcon from "../../molecules/list/list";


import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { DataStateType } from "../../../types/global";


type PropsType = {
    iData: DataStateType,
    eData: DataStateType
}


export default function CalendarArea(props: PropsType) {

    const { iData, eData } = props;


    // テスト表示データ
    const listItems:{title: string, description?: string, icon: React.ReactNode}[] = [
        {title: "本買った", description: "¥5,000", icon: <MenuBookIcon fontSize="small"/>},
        {title: "給料", description: "¥400,000", icon: <CreditCardIcon fontSize="small"/>},
        {title: "だんご食べた", description: "¥2,500", icon: <KebabDiningIcon fontSize="small"/>}
    ];

    const changeCalendar = (val: "partial" | "shallow" | "finish" | null | undefined, selectionState: PickerSelectionState | undefined) => {

        console.log(val, selectionState);

        let data = [];

        iData.forEach((val, index) => {
            if(val.createDate)
            data.push(val)
        })

    }

    return (
        <div className={styles.flexItemWrapper}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={4} sm={4} md={4}>
                        <MyCard darkMode={false} width="100%">
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                <DateCalendar 
                                    displayWeekNumber 
                                    onChange={
                                        (val: "partial" | "shallow" | "finish" | null | undefined, selectDate:  PickerSelectionState | undefined) => {
                                            changeCalendar(val, selectDate)
                                        }
                                    } 
                                />
                            </LocalizationProvider>      
                        </MyCard>                      
                    </Grid>
                    <Grid xs={4} sm={4} md={8}>
                        <MyCard darkMode={false} width="100%">
                            <ListWithIcon items={listItems} showHeader={true} headerData={format(new Date(), 'yyyy/MM/dd') + 'の収支一覧'}/>
                        </MyCard>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}