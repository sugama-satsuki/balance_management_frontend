
import React from "react";

/* import css */ 
import styles from './reportArea.module.css';

/* import atoms */ 
import Line from "../../atoms/line/Line";
import MyCard from '../../atoms/card/card';
import { ContentsTitle } from "../../atoms/title/title";
import Tag from "../../atoms/tag,/tag";

/* import molecules */ 
import { IconWithTitle } from "../../molecules/icon_with_contents/iconWithContents";
import BaseLineCharts from "../../molecules/charts/baseLine";
import { HorizontalTabs } from "../../molecules/tab_content/tabContent";

/* import mui */ 
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';

import { DataSeriesType, DataStateType, IdWithTextType, MonthlyDataType, ReportDatesType } from "../../../types/global";

import { format } from "date-fns";
import axios from "axios";



export default function ReportArea() {

    let xAxisLabelArr:string[] = [];

    const tabItems:IdWithTextType[] = [
        {text: '日別', id: 'day'},
        {text: '月別', id: 'month'},
    ]

    React.useEffect(() => {
        let diffDay = Math.floor((reportDateData.beginDate.getTime() - reportDateData.endDate.getTime()) / (1000 * 60 * 60 * 24));
        
        for(let i = 1; i <= diffDay; i++) {
            xAxisLabelArr.push(String(i));
        }

    }, []);



    // 今日の日付
    const today = new Date();


    const [reportDateData, setReportDateData] = React.useState<ReportDatesType>({
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
        createChartData(incomeData, expensesData, id === tabItems[1].id, reportDateData);
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
        calcTotalData(income.data, expenses.data, reportDateData);

        // グラフ用日・月毎データにまとめる
        createChartData(income.data, expenses.data, false, reportDateData);

    }


    /* 
     * 今月と先月の収支の計算
     */
    const calcTotalData = (income:DataStateType, expenses:DataStateType, reportDate:ReportDatesType) => {

        let i_fMonthTotal = 0;
        let i_tMonthTotal = 0;
        let e_fMonthTotal = 0;
        let e_tMonthTotal = 0;

        let selectDate = reportDate.beginDate;
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

        setMonthlyIncome(() => { return {firstMonthTotal: i_fMonthTotal, thisMonthTotal: i_tMonthTotal} });
        setMonthlyExpenses(() => { return {firstMonthTotal: e_fMonthTotal, thisMonthTotal: e_tMonthTotal} });
    }



    // タブ押下時、月毎データ、日毎データにまとめる処理
    const createChartData = (income:DataStateType, expenses:DataStateType, isMonth:boolean, reportDate:ReportDatesType) => {

        let incomeSeries: number[] = [];
        let expensesSeries: number[] = [];

        // TODO: 年度が違う同じ月で金額が同じになっているので、修正
        if(isMonth){
            /* 月別 */
            const maxDateNum = 12;
            const selectYear  =  reportDate.beginDate.getFullYear();

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

            const maxDateNum = reportDate.endDate.getDate();
            const selectMonth  =  reportDate.beginDate.getMonth();

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
                    // 日付が一致してたら
                    if(i === new Date(e.date).getDate() && selectMonth === new Date(e.date).getMonth()){
                        expensesTotal += e.amount;    // 金額を足す
                    }
                });

                incomeSeries.push(incomeTotal);
                expensesSeries.push(expensesTotal);
            }

        }

        // データのセット
        setSeriesData((data) => {
            return( {
                income:{
                    name: 'Income',
                    data: incomeSeries,
                    type: 'area',
                    color: isMonth ? 'var(--my-color-green)' : 'var(--my-color-pink)',
                    fillColor: {
                        linearGradient: {
                            x1: 1,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, isMonth ? 'var(--my-color-green)' : 'var(--my-color-pink)'],
                            [1, 'var(--my-color-white)']
                        ]
                    }
                }, 
                expenses:{
                    name: 'Expenses',
                    data: expensesSeries,
                    type: 'area',
                    color: isMonth ? 'var(--my-color-orange)' : 'var(--my-color-purple)',
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, isMonth ? 'var(--my-color-orange)' : 'var(--my-color-purple)'],
                            [1, 'var(--my-color-white)']
                        ]
                    }
                }
            });
        });
    }



    /*
     * レポート月変更ボタン押下時処理
     */
    const changeReportMonth = (action: 'next' | 'back') => {

        let oldBeginDate = reportDateData.beginDate;
        let oldEndDate = reportDateData.endDate;

        let reportDate = {
            beginDate: action === 'next' ? 
                new Date(oldBeginDate.getFullYear(), oldBeginDate.getMonth()+1, oldBeginDate.getDate())
                :
                new Date(oldBeginDate.getFullYear(), oldBeginDate.getMonth()-1, oldBeginDate.getDate())
                ,
            endDate: action === 'next' ?
                new Date(oldEndDate.getFullYear(), oldEndDate.getMonth()+2, 0)
                :
                new Date(oldEndDate.getFullYear(), oldEndDate.getMonth(), 0)
        }

        setReportDateData(() => { return reportDate });

        calcTotalData(incomeData, expensesData, reportDate);
        createChartData(incomeData, expensesData, tabSelectVal === tabItems[1].id, reportDate);
    }




    return(
        <MyCard darkMode={false} width="100%">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={4} sm={3} md={4}>
                        <ContentsTitle 
                            title="レポート" 
                            subTitle={format(reportDateData.beginDate, 'yyyy/MM/dd') + '〜' + format(reportDateData.endDate, 'yyyy/MM/dd')}
                        />
                        <div className={styles.monthSwitchArea}>
                            <div onClick={() => changeReportMonth('back')}>＜ 前の月</div>
                            <div onClick={() => changeReportMonth('next')}>次の月 ＞</div>
                        </div>
                    </Grid>
                    <Grid xs={4} sm={5} md={8}>
                        <div className={styles.tabsWrapper}>
                            <HorizontalTabs tabItems={tabItems} borderColor={'var(--my-color-pink)'} selectValue={tabSelectVal} parentEvent={setTabState}/>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={4} sm={3} md={4}>
                        <div className={styles.totalExpensesTextArea}>
                            <div>
                            <div className={styles.bottomContent}>
                                <Tag text='収入' bgColor='--my-color-pink' small/>
                                <p className={styles.money}>{ '￥' + monthlyIncome.thisMonthTotal.toLocaleString() }</p>
                                <div className={styles.details}>
                                    { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? 
                                        <SouthEastIcon className={`${styles.icon} ${'red'}`}/> : <NorthEastIcon className={`${styles.icon} ${'green'}`}/> 
                                    }
                                    <p className={styles.text}>前月より
                                        { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? 
                                            <span className='red'>¥{(monthlyIncome.firstMonthTotal - monthlyIncome.thisMonthTotal).toLocaleString()}</span>
                                            : <span className='green'>¥{(monthlyIncome.thisMonthTotal - monthlyIncome.firstMonthTotal).toLocaleString()}</span>
                                        }
                                        { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? '減りました。' : '増えました。'}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.bottomContent}>
                                <Tag text='支出' bgColor='--my-color-purple' small/>
                                <p className={styles.money}>{ '￥' + monthlyExpenses.thisMonthTotal.toLocaleString() }</p>
                                <div className={styles.details}>
                                    { monthlyExpenses.firstMonthTotal > monthlyExpenses.thisMonthTotal ? 
                                        <SouthEastIcon className={`${styles.icon} ${'green'}`}/> : <NorthEastIcon className={`${styles.icon} ${'red'}`}/> 
                                    }
                                    <p className={styles.text}>前月より
                                        { monthlyExpenses.firstMonthTotal > monthlyExpenses.thisMonthTotal ? 
                                            <span className='green'>¥{(monthlyExpenses.firstMonthTotal - monthlyExpenses.thisMonthTotal).toLocaleString()}</span>
                                            : <span className='red'>¥{(monthlyExpenses.thisMonthTotal - monthlyExpenses.firstMonthTotal).toLocaleString()}</span>
                                        }
                                        { monthlyExpenses.thisMonthTotal < monthlyExpenses.firstMonthTotal ? '減りました。' : '増えました。'}
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={4} sm={5} md={8}>
                        {/* 日別：28〜31日 /  月別：12ヶ月 ごとに表示*/}
                        <BaseLineCharts height='340' series={[seriesData.income, seriesData.expenses]} title='' subTitle='' xAxisCategory={xAxisLabelArr} />
                    </Grid>
                </Grid>
            </Box>
            <Line margin='--my-margin-s' />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid xs={4} sm={4} md={3}>
                        <IconWithTitle title='カテゴリ1' subTitle='今月の出費No1カテゴリ' icon={<CategoryIcon className={styles.iconWithTitleIcon} />} iconCircle />
                    </Grid>
                    <Grid xs={4} sm={4} md={3}>
                        <IconWithTitle title='03/18' subTitle='今月の出費No1日' icon={<TodayIcon className={styles.iconWithTitleIcon} />} iconCircle />
                    </Grid>
                    <Grid xs={4} sm={4} md={3}>
                        <IconWithTitle title='カテゴリ1' subTitle='今月の収入No1カテゴリ' secondary icon={<CategoryIcon className={styles.iconWithTitleIcon} />} iconCircle />
                    </Grid>
                    <Grid xs={4} sm={4} md={3}>
                        <IconWithTitle title='03/18' subTitle='今月の収入No1日' secondary icon={<TodayIcon className={styles.iconWithTitleIcon} />} iconCircle />
                    </Grid>
                </Grid>
            </Box>
        </MyCard>
    );
}