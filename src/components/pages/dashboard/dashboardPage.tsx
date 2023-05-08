import React from 'react';

/* import css */ 
import styles from './dashboard.module.css';

/* import mui */ 
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KebabDiningIcon from '@mui/icons-material/KebabDining';

/* import date-fns */
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import axios from 'axios';
import { DataSeriesType, DataStateType, IdWithTextType, MonthlyDataType } from '../../../types/global';

/* import template */
import BaseLayout from '../../template/base_layout/baseLayout';

/* import atoms */ 
import MyCard from '../../atoms/card/card';
import Spacer from '../../atoms/spacer/spacer';

/* import molecules */ 
import ListWithIcon from '../../molecules/list/list';

import ReportArea from '../../organisms/report_area/reportArea';



type ReportDates = {
    beginDate: Date,
    endDate: Date
}


export default function Dashboard(){

    // テスト表示データ
    const listItems:{title: string, description?: string, icon: React.ReactNode}[] = [
        {title: "本買った", description: "¥5,000", icon: <MenuBookIcon fontSize="small"/>},
        {title: "給料", description: "¥400,000", icon: <CreditCardIcon fontSize="small"/>},
        {title: "だんご食べた", description: "¥2,500", icon: <KebabDiningIcon fontSize="small"/>}
    ];

    const tabItems:IdWithTextType[] = [
        {text: '日別', id: 'day'},
        {text: '月別', id: 'month'},
    ]

    // 今日の日付
    const today = new Date();


    const [reportDateData, setReportDateData] = React.useState<ReportDates>({
        beginDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
    });

    const [monthlyIncome, setMonthlyIncome] = React.useState<MonthlyDataType>({firstMonthTotal: 0, thisMonthTotal: 0});
    const [monthlyExpenses, setMonthlyExpenses] = React.useState<MonthlyDataType>({firstMonthTotal: 0, thisMonthTotal: 0});

    const [incomeData, setIncomeData] = React.useState<DataStateType>([]);
    const [expensesData, setExpensesData] = React.useState<DataStateType>([]);
    
    const [seriesData, setSeriesData] = React.useState<DataSeriesType>({
        income: {
            name: 'Income',
            data: [],
            type: 'area',
            color: 'var(--my-color-pink)',
            fillColor: {
                linearGradient: {
                    x1: 1,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, 'var(--my-color-pink)'],
                    [1, 'var(--my-color-white)']
                ]
            }
        }, 
        expenses: {
            name: 'Expenses',
            data: [],
            type: 'area',
            color: 'var(--my-color-purple)',
            fillColor: {
                linearGradient: {
                    x1: 1,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, 'var(--my-color-purple)'],
                    [1, 'var(--my-color-white)']
                ]
            }
        }
    });

    const [tabSelectVal, setTabSelectVal] = React.useState<string>(tabItems[0].id);

    const setTabState = (id:string) => {
        setTabSelectVal(id);
    }


    // 初回のみ実行
    React.useEffect(() => {
        // データ取得
        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // dataの取得
    const fetchData = async () => {
        const income = await axios.get("/data/income/642e75bea7b120ca2fa41655");
        const expenses = await axios.get("/data/expenses/642e75bea7b120ca2fa41655");

        setIncomeData(income.data);
        setExpensesData(expenses.data);

        // 月の収入、支出の総額を画面変数に割り当てる
        calcTotalData(income.data, expenses.data);

        // グラフ用日・月毎データにまとめる
        createChartData(income.data, expenses.data, false);

    }


    /* 
     * 今月と先月の収支の計算
     */
    const calcTotalData = (income:DataStateType, expenses:DataStateType) => {

        let i_fMonthTotal = 0;
        let i_tMonthTotal = 0;
        let e_fMonthTotal = 0;
        let e_tMonthTotal = 0;

        let selectDate = reportDateData.beginDate;
        let firstDate = new Date(selectDate.getFullYear(), selectDate.getMonth()-1, 1);

        // 収入の計算
        income.forEach((val, i) => {
            let valDate  = new Date(val.date);

            // 同じ月だったら
            if(valDate.getFullYear() === selectDate.getFullYear() && valDate.getMonth() === selectDate.getMonth()) {
                i_tMonthTotal += val.amount;
            }
            // 前の月だったら
            if(valDate.getFullYear() === firstDate.getFullYear() && valDate.getMonth() === firstDate.getMonth()) {
                i_fMonthTotal += val.amount;
            }
        })

        // 支出の計算
        expenses.forEach((val, i) => {
            let valDate  = new Date(val.date);

            // 同じ月だったら
            if(valDate.getFullYear() === selectDate.getFullYear() && valDate.getMonth() === selectDate.getMonth()) {
                e_tMonthTotal += val.amount;
            }
            // 前の月だったら
            if(valDate.getFullYear() === firstDate.getFullYear() && valDate.getMonth() === firstDate.getMonth()) {
                e_fMonthTotal += val.amount;
            }
        })

        setMonthlyIncome({firstMonthTotal: i_fMonthTotal, thisMonthTotal: i_tMonthTotal});
        setMonthlyExpenses({firstMonthTotal: e_fMonthTotal, thisMonthTotal: e_tMonthTotal});
    }


    // TODO：タブ押下時、月毎データ、日毎データにまとめる処理
    const createChartData = (income:DataStateType, expenses:DataStateType, isMonth:boolean) => {

        let incomeSeries: number[] = [];
        let expensesSeries: number[] = [];

        if(isMonth){
            /* 月別 */

            const maxDateNum = 12;
            const selectYear  =  reportDateData.beginDate.getFullYear();

            // 表示月の最終日付まで繰り返す
            for(let i = 0; i < maxDateNum; i++){

                // その日の金額
                let incomeTotal = 0;
                let expensesTotal = 0;

                // 収入
                income.forEach(e => {
                    // 年月が一致してたら
                    if(i === new Date(e.date).getMonth() && selectYear === new Date(e.date).getFullYear()){
                        incomeTotal += e.amount;      // 金額を足す
                    }
                });

                // 支出
                expenses.forEach(e => {
                    console.log(i === new Date(e.date).getDate(), i, new Date(e.date).getDate())
                    // 年月が一致してたら
                    if(i === new Date(e.date).getMonth() && selectYear === new Date(e.date).getFullYear()){
                        expensesTotal += e.amount;    // 金額を足す
                    }
                });

                incomeSeries.push(incomeTotal);
                expensesSeries.push(expensesTotal);
            }

        } else{

            /* 日付別 */ 

            const maxDateNum = reportDateData.endDate.getDate();
            const selectMonth  =  reportDateData.beginDate.getMonth();

            // 表示月の最終日付まで繰り返す
            for(let i = 0; i < maxDateNum; i++){

                // その日の金額
                let incomeTotal = 0;
                let expensesTotal = 0;

                // 収入
                income.forEach(e => {
                    // 日付が一致してたら
                    if(i === new Date(e.date).getDate() && selectMonth === new Date(e.date).getMonth()){
                        incomeTotal += e.amount;      // 金額を足す
                    }
                });

                // 支出
                expenses.forEach(e => {
                    console.log(i === new Date(e.date).getDate(), i, new Date(e.date).getDate())
                    // 日付が一致してたら
                    if(i === new Date(e.date).getDate() && selectMonth === new Date(e.date).getMonth()){
                        expensesTotal += e.amount;    // 金額を足す
                    }
                });

                incomeSeries.push(incomeTotal);
                expensesSeries.push(expensesTotal);
            }

        }

        setSeriesData((data) => {
            return( {
                income:{
                    name: 'Income',
                    data: incomeSeries,
                    type: 'area',
                    color: 'var(--my-color-pink)',
                    fillColor: {
                        linearGradient: {
                            x1: 1,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, 'var(--my-color-pink)'],
                            [1, 'var(--my-color-white)']
                        ]
                    }
                }, 
                expenses:{
                    name: 'Expenses',
                    data: expensesSeries,
                    type: 'area',
                    color: 'var(--my-color-purple)',
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, 'var(--my-color-purple)'],
                            [1, 'var(--my-color-white)']
                        ]
                    }
                }
            });
        });
    }

    // レポート月変更ボタン押下時処理
    const changeReportMonth = (action: 'next' | 'back') => {

        let oldBeginDate = reportDateData.beginDate;
        let oldEndDate = reportDateData.endDate;

        setReportDateData({
            beginDate: action === 'next' ? 
                new Date(oldBeginDate.getFullYear(), oldBeginDate.getMonth()+1, oldBeginDate.getDate())
                :
                new Date(oldBeginDate.getFullYear(), oldBeginDate.getMonth()-1, oldBeginDate.getDate())
                ,
            endDate: action === 'next' ?
                new Date(oldEndDate.getFullYear(), oldEndDate.getMonth()+2, 0)
                :
                new Date(oldEndDate.getFullYear(), oldEndDate.getMonth(), 0)
        });
        console.log('call change report');
        calcTotalData(incomeData, expensesData);
        createChartData(incomeData, expensesData, tabSelectVal === tabItems[1].id);
    }


    return(
        <BaseLayout menuNumber={1} pageTitle="ダッシュボード">
        <div className={styles.topPageWrapper}>

            <Spacer size="s">
                <ReportArea 
                    reportDateData={reportDateData}
                    changeReportMonth={changeReportMonth}
                    tabItems={tabItems}
                    tabSelectVal={tabSelectVal}
                    setTabState={setTabState}
                    monthlyIncome={monthlyIncome}
                    monthlyExpenses={monthlyExpenses}
                    seriesData={seriesData}
                />
            </Spacer>

            <Spacer size="s">
                <div className={styles.flexItemWrapper}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid xs={4} sm={4} md={4}>
                                <MyCard darkMode={false} width="100%">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                        <DateCalendar displayWeekNumber />
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
            </Spacer>
        </div>
        </BaseLayout>
    )
}