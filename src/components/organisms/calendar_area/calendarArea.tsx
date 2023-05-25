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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SavingsIcon from '@mui/icons-material/Savings';

/* import atoms */ 
import MyCard from "../../atoms/card/card";

/* import molecules */ 
import ListWithIcon from "../../molecules/list/list";


import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { DataStateType, ListItemDataType } from "../../../types/global";

/* */ 
import { pickOutDayData } from "../../../utils/pickOutData";


type PropsType = {
    iData: DataStateType,
    eData: DataStateType
}


export default function CalendarArea(props: PropsType) {

    const { iData, eData } = props;


    // state定義
    const [listItems, setListItems] = React.useState<ListItemDataType[]> ([]);
    const [listDate, setListDate] = React.useState<Date>(new Date());

    let allData: DataStateType[] = eData.concat(iData);

    React.useEffect(() => {

        let valDate = new Date();

        let data:DataStateType = pickOutDayData(
            allData, 
            valDate.getFullYear(), 
            valDate.getMonth(),
            valDate.getDate()
        );
        
        setListItems(createItemData(data));
        setListDate(valDate);

    }, [])

    /*
     * 関数定義
     */ 
    const changeCalendar = (val: "partial" | "shallow" | "finish" | null | undefined, selectionState: PickerSelectionState | undefined) => {

        let valDate = val !== null && val !== undefined ? new Date(val): new Date();

        let data:DataStateType = pickOutDayData(
                                    allData, 
                                    valDate.getFullYear(), 
                                    valDate.getMonth(),
                                    valDate.getDate()
                                );

        setListItems(createItemData(data));
        setListDate(valDate);
        
    }


    // リストコンポーネントに渡す値を作る関数
    const createItemData = (dataList: DataStateType): ListItemDataType[] => {

        const result: ListItemDataType[] = dataList.map((val, i) => {
            return ({
                title: val.title, 
                description: '¥' + val.amount.toLocaleString(), 
                icon: val.isTypeIncome ? <SavingsIcon fontSize="small"/> : <ShoppingCartIcon fontSize="small"/>
            });
        })

        return result;
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
                            <ListWithIcon items={listItems} showHeader={true} headerData={format(listDate, 'yyyy/MM/dd') + 'の収支一覧'}/>
                        </MyCard>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}