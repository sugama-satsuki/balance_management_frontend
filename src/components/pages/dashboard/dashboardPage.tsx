import React from 'react';

/* import css */ 
import styles from './dashboard.module.css';


/* import template */
import BaseLayout from '../../template/base_layout/baseLayout';

/* import atoms */ 
import Spacer from '../../atoms/spacer/spacer';

/* import organisms */ 
import ReportArea from '../../organisms/report_area/reportArea';
import CalendarArea from '../../organisms/calendar_area/calendarArea';
import axios from 'axios';
import { DataStateType } from '../../../types/global';




export default function Dashboard(){

    const [incomeData, setIncomeData] = React.useState<DataStateType>([]);
    const [expensesData, setExpensesData] = React.useState<DataStateType>([]);

    const [isFetched, setIsFetched] = React.useState<boolean>(false);

    // 初回のみ実行
    React.useEffect(() => {
        // データ取得
        fetchData().then(([income, expenses]) => {
            
            setIncomeData(() => { return income });
            setExpensesData(() => { return expenses });

            setIsFetched(true);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // dataの取得
    const fetchData = async () => {
        const income = await axios.get("/data/income/642e75bea7b120ca2fa41655");
        const expenses = await axios.get("/data/expenses/642e75bea7b120ca2fa41655");

        // console.log(
        //     income.data,
        //     expenses.data
        // )

        // setIncomeData(() => { return income.data });
        // setExpensesData(() => { return expenses.data });

        return [income.data, expenses.data];
    }



    return(
        <BaseLayout menuNumber={1} pageTitle="ダッシュボード">
        <div className={styles.topPageWrapper}>
            {
                isFetched && 
                <>
                    <Spacer size="s">
                        <ReportArea iData={incomeData} eData={expensesData} />
                    </Spacer>

                    <Spacer size="s">
                        <CalendarArea iData={incomeData} eData={expensesData} />
                    </Spacer>
                </>
            }
        </div>
        </BaseLayout>
    )
}