import React, { useState } from "react";

// import mui
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ja from 'date-fns/locale/ja';

// import css
import styles from '../../styles/molecules/myDatePicker.module.css';



type Props = {
    value: Date,
    changeFunc: (value: Date | null, selectionState?: PickerSelectionState | undefined) => void
}

export default function MyDatePicker(props: Props) {

    const { value, changeFunc } = props;
    const [showCalender, setShowCalender] = useState<boolean>(false);


    // inputのonChange関数
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 変換
        let date:string = event.target.value.replace('年', '-').replace('月', '-').replace('日', '');
        changeFunc(new Date(date));
    }

    // calenderのonChange関数
    const onChangeCalender = (value: Date | null, selectionState?: PickerSelectionState | undefined) => {
        setShowCalender(!showCalender);
        changeFunc(value);
    }

    /* <input type='text' 
                    value={ value === null ? 'YY年MM月DD日' : `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日` } 
                    onChange={onChangeInput}
                    className={styles.input}
                /> */

                /* <CalendarMonthIcon className={styles.icon} /> */
    
    return(
        <div className={styles.my_calender}>
            <div className={styles.inputArea_wrapper}>
                <input type='text' 
                    defaultValue={ value === null ? 'YY年MM月DD日' : `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日` } 
                    onClick={() => {setShowCalender(!showCalender)}}
                    className={styles.input}
                />
            </div>
            <div className={`${styles.calenderArea_wrapper} ${showCalender ? styles.calender_show : styles.calender_hidden}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DateCalendar value={ value } onChange={onChangeCalender} />
                </LocalizationProvider>
            </div>
        </div>
    )
}

