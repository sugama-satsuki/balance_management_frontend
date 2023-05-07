import React from 'react';

/* import css */ 
import styles from './dashboard.module.css';

/* import mui */ 
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KebabDiningIcon from '@mui/icons-material/KebabDining';

/* import date-fns */
import { format, startOfWeek } from 'date-fns';
import ja from 'date-fns/locale/ja';
import axios from 'axios';
import { DataSeriesType, DataStateType } from '../../../settingDataType';

/* import template */
import BaseLayout from '../../template/base_layout/baseLayout';

/* import atoms */ 
import MyCard from '../../atoms/card/card';
import Spacer from '../../atoms/spacer/spacer';
import Tag from '../../atoms/tag,/tag';
import Line from '../../atoms/line/Line';
import { ContentsTitle } from '../../atoms/title/title';

/* import molecules */ 
import ListWithIcon from '../../molecules/list/list';
import BaseLineCharts from '../../molecules/charts/baseLine';
import { HorizontalTabs } from '../../molecules/tab_content/tabContent';
import { IconWithTitle } from '../../molecules/icon_with_contents/iconWithContents';


import { SeriesOptionsType } from 'highcharts';



interface ExpensesState {
    selectMonth: number,
    beginDate: Date,
    endDate: Date
}


export default function Dashboard(){

    // 表示データ
    const listItems:{title: string, description?: string, icon: React.ReactNode}[] = [
        {title: "本買った", description: "¥5,000", icon: <MenuBookIcon fontSize="small"/>},
        {title: "給料", description: "¥400,000", icon: <CreditCardIcon fontSize="small"/>},
        {title: "だんご食べた", description: "¥2,500", icon: <KebabDiningIcon fontSize="small"/>}
    ];

    const tabItems:{text: string, id: string}[] = [
        {text: '日別', id: 'day'},
        {text: '月別', id: 'month'},
    ]

    // 今日の日付
    const today = new Date();
    // 先月の1日の日付
    const firstDate = new Date(today.getFullYear(), today.getMonth()-1, 1);


    const [reportDateData, setReportDateData] = React.useState<ExpensesState>({
        selectMonth: today.getMonth(),
        beginDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
    });

    const [monthlyIncome, setMonthlyIncome] = React.useState<{firstMonthTotal: number, thisMonthTotal: number}>({firstMonthTotal: 0, thisMonthTotal: 0});
    const [monthlyExpenses, setMonthlyExpenses] = React.useState<{firstMonthTotal: number, thisMonthTotal: number}>({firstMonthTotal: 0, thisMonthTotal: 0});

    const [incomeData, setIncomeData] = React.useState<DataStateType>([]);
    const [expensesData, setExpensesData] = React.useState<DataStateType>([]);
    
    const [seriesData, setSeriesData] = React.useState<DataSeriesType>({
        income: {
            name: 'Income',
            data: [43934, 48656, 65165, 81827, 112143, 142383, 171533],
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
            data: [24916, 37941, 29742, 29851, 32490, 30282, 38121],
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
        createChartData(income.data, expenses.data, false, new Date());

    }


    /* 
     * 今月と先月の収支の計算
     */
    const calcTotalData = (income:DataStateType, expenses:DataStateType) => {

        let i_fMonthTotal = 0;
        let i_tMonthTotal = 0;
        let e_fMonthTotal = 0;
        let e_tMonthTotal = 0;

        console.log(income, expenses);

        
        // 収入の計算
        income.forEach((val, i) => {
            let valDate  = new Date(val.date);

            // 同じ月だったら
            if(valDate.getFullYear() === today.getFullYear() && valDate.getMonth() === today.getMonth()) {
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
            if(valDate.getFullYear() === today.getFullYear() && valDate.getMonth() === today.getMonth()) {
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
    const createChartData = (income:DataStateType, expenses:DataStateType, isMonth:boolean, startDay:Date) => {

        let incomeSeries = [];
        let expensesSeries = [];

        if(isMonth){

        } else{
            // ** 日別(指定した日付を含む7日間分)用のデータ ** 
            // 取得した日付を日曜日始まりに変換
            
            // 該当の日付の
        }
        // 

        setSeriesData((data) => {
            return( {
                income:{
                    name: 'Income',
                    data: [43934, 48656, 65165, 81827, 112143, 142383, 171533],
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
                    data: [24916, 37941, 29742, 29851, 32490, 30282, 38121],
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


    return(
        <BaseLayout menuNumber={1} pageTitle="ダッシュボード">
        <div className={styles.topPageWrapper}>

            <Spacer size="s">
                <MyCard darkMode={false} width="100%">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid xs={4} sm={3} md={4}>
                                <ContentsTitle 
                                    title="レポート" 
                                    subTitle={format(reportDateData.beginDate, 'yyyy/MM/dd') + '〜' + format(reportDateData.endDate, 'yyyy/MM/dd')}
                                />
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
                                {/* 日別：1週間ごとに表示 /  月別：7ヶ月ごとに表示*/}
                                <BaseLineCharts height='340' series={[seriesData.income, seriesData.expenses]} title='' subTitle='' />
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