import React, { useState } from "react";

// import mui
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import ja from 'date-fns/locale/ja';

// import css
import styles from '../../styles/molecules/myDatePicker.module.css';



type Props = {
    selectValue: Date,
    changeFunc: (value: Date, selectionState?: PickerSelectionState | undefined) => void
}

export default function MyDatePicker(props: Props) {

    const { selectValue, changeFunc } = props;
    const [showCalender, setShowCalender] = useState<boolean>(false);
    const [selectDate, setSelectDate] = useState<Date>(selectValue);


    // calenderのonChange関数
    const onChangeCalender = (value: Date | null, selectionState?: PickerSelectionState | undefined) => {
        let newDate:Date = value == null ? new Date() : value;
        setSelectDate(newDate);
        setShowCalender(!showCalender);
        changeFunc(newDate);
    }
    
    return(
        <div className={styles.my_calender}>
            <div className={styles.inputArea_wrapper}>
                <input type='text' 
                    value={`${selectDate.getFullYear()}年${selectDate.getMonth() + 1}月${selectDate.getDate()}日` } 
                    onClick={() => {setShowCalender(!showCalender)}}
                    onChange={() => {}}
                    className={styles.input}
                />
            </div>
            <div className={`${styles.calenderArea_wrapper} ${showCalender ? styles.calender_show : styles.calender_hidden}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DateCalendar value={ selectDate } onChange={onChangeCalender} />
                </LocalizationProvider>
            </div>
        </div>
    )
}

