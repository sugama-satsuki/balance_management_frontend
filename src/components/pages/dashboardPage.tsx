import React from 'react';

/* import css */ 
import styles from '../../styles/page/dashboard.module.css';

// import template
import BaseLayout from '../template/baseLayout';

/* import atoms */ 
import MyCard from '../atoms/card';
import Spacer from '../atoms/spacer';
import Tag from '../atoms/tag';
import Line from '../atoms/Line';
import { ContentsTitle } from '../atoms/title';

/* import molecules */ 
import ListWithIcon from '../molecules/list';
import BaseLineCharts from '../molecules/charts/baseLine';
import { HorizontalTabs } from '../molecules/tabContent';
import { IconWithTitle } from '../molecules/iconWithContents';

/* import mui */ 
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/* import date-fns */
import { startOfWeek, format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import axios from 'axios';
import { DataStateType } from '../../settingDataType';


interface WeatherState {
    todayWeather: string,
    todayWeatherCode: number,
    weeklyDates: {week: string, day: number}[]
}

interface ExpensesState {
    selectMonth: number,
    beginDate: Date,
    endDate: Date
}


export default function Dashboard(){

    // 表示データ
    const listItems:{title: string, description?: string, img: string}[] = [
        {title: "タスク1", description: "タスク1の説明です。〇〇をします。", img: ""},
        {title: "タスク2", description: "タスク2の説明です。〇〇をします。", img: ""},
        {title: "タスク3", description: "タスク3の説明です。〇〇をします。", img: ""}
    ];

    const tabItems:{text: string, id: string}[] = [
        {text: '月別', id: 'month'},
        {text: '日別', id: 'day'}
    ]

    const today = new Date();

    const dayOfWeekStr:string[] = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

    const [weather, setWeather] = React.useState<WeatherState>({
        todayWeather: '',
        todayWeatherCode: 0,
        weeklyDates: [],
    });

    const [reportDateData, setReportDateData] = React.useState<ExpensesState>({
        selectMonth: today.getMonth(),
        beginDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
    });

    const [monthlyIncome, setMonthlyIncome] = React.useState<{firstMonthTotal: number, thisMonthTotal: number}>({firstMonthTotal: 0, thisMonthTotal: 0});
    const [monthlyExpenses, setMonthlyExpenses] = React.useState<{firstMonthTotal: number, thisMonthTotal: number}>({firstMonthTotal: 0, thisMonthTotal: 0});

    const [incomeData, setIncomeData] = React.useState<DataStateType>([]);
    const [expensesData, setExpensesData] = React.useState<DataStateType>([]);
    
    
    const columnData = [{
        name: '1月',
        y: 80000,
        drilldown: 'category1',
        color: '#AFE1E6'
    },
    {
        name: '2月',
        y: 400000,
        drilldown: 'category2',
        color: '#AFE1E6'
    },
    {
        name: '3月',
        y: 500000,
        drilldown: 'category3',
        color: '#12BBB4'
    }]
   
    const [tabSelectVal, setTabSelectVal] = React.useState<string>(tabItems[0].id);

    const setTabState = (id:string) => {
        setTabSelectVal(id);
    }


    // 初回のみ実行
    React.useEffect(() => {

        // 天気予報の取得　APIリクエスト
        fetch("https://www.jma.go.jp/bosai/forecast/data/forecast/471000.json")
        .then(response => {
            return response.json()
        })
        .then(weather => {
            console.log(weather)
            setWeather({
                todayWeather: weather[0].timeSeries[0].areas[0].weathers[0],
                todayWeatherCode: weather[0].timeSeries[0].areas[0].weatherCodes[0],
                weeklyDates: [{week: dayOfWeekStr[startOfWeek(new Date()).getDay()], day: startOfWeek(new Date()).getDate()}]
            });
        })
        .catch(err => {
            return "err:" + err;
        })

        // データ取得
        fetchData();

        // TODO: 月の収入、支出の総額を画面変数に割り当てる
        

        // TODO: グラフ用月毎データにまとめる

        // 

    }, [])


    // dataの取得
    const fetchData = async () => {
        const income = await axios.get("/data/income/642e75bea7b120ca2fa41655");
        const expenses = await axios.get("/data/expenses/642e75bea7b120ca2fa41655");

        setIncomeData(income.data);
        setExpensesData(expenses.data);
    }

    const calcTotalData = () => {


        // setMonthlyIncome({});
        // setMonthlyExpenses();
    }

    // TODO：タブ押下時、月毎データ、日毎データにまとめる処理


    return(
        <BaseLayout menuNumber={1} pageTitle="ダッシュボード">
        <div className={styles.topPageWrapper}>

            {/* <Spacer size="m">
                <div className={styles.flexItemLeftWrapper}>
                    <MyCard darkMode={true} width="160px" customCss={styles.flexItem} bgCustomColor='var(--my-color-orange)'>
                        <CalendarTodayIcon className={styles.iconWithTitleIcon} />
                        <p>{format(new Date(), 'yyyy/MM/dd')}</p>
                    </MyCard>
                    <MyCard darkMode={false} width="25%" customCss={styles.flexItem} bgCustomColor='var(--my-color-blue)'>
                        <Brightness7Icon className={styles.iconWithTitleIcon} />
                        <p>{weather.todayWeather}</p>
                    </MyCard>
                </div>
            </Spacer> */}

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
                                        <p className={styles.money}>{ '￥' + incomeData }</p>
                                        <div className={styles.details}>
                                            { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? 
                                                <SouthEastIcon className={`${styles.icon} ${'red'}`}/> : <NorthEastIcon className={`${styles.icon} ${'green'}`}/> 
                                            }
                                            <p className={styles.text}>前月より
                                                { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? 
                                                    <span className='red'>¥{monthlyIncome.firstMonthTotal - monthlyIncome.thisMonthTotal}</span>
                                                    : <span className='green'>¥{monthlyIncome.thisMonthTotal - monthlyIncome.firstMonthTotal}</span>
                                                }
                                                { monthlyIncome.firstMonthTotal > monthlyIncome.thisMonthTotal ? '減りました。' : '増えました。'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.bottomContent}>
                                        <Tag text='支出' bgColor='--my-color-purple' small/>
                                        <p className={styles.money}>{ '￥' + expensesData }</p>
                                        <div className={styles.details}>
                                            { monthlyExpenses.firstMonthTotal > monthlyExpenses.thisMonthTotal ? 
                                                <SouthEastIcon className={`${styles.icon} ${'green'}`}/> : <NorthEastIcon className={`${styles.icon} ${'red'}`}/> 
                                            }
                                            <p className={styles.text}>前月より
                                                { monthlyExpenses.firstMonthTotal > monthlyExpenses.thisMonthTotal ? 
                                                    <span className='green'>¥{monthlyExpenses.firstMonthTotal - monthlyExpenses.thisMonthTotal}</span>
                                                    : <span className='red'>¥{monthlyExpenses.thisMonthTotal - monthlyExpenses.firstMonthTotal}</span>
                                                }
                                                { monthlyExpenses.thisMonthTotal < monthlyExpenses.firstMonthTotal ? '減りました。' : '増えました。'}
                                            </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={4} sm={5} md={8}>
                                <BaseLineCharts height='340' />
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
                            <Grid xs={4} sm={4} md={6}>
                                <MyCard darkMode={false} width="100%">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                        <DateCalendar displayWeekNumber />
                                    </LocalizationProvider>      
                                </MyCard>                      
                            </Grid>
                            <Grid xs={4} sm={4} md={6}>
                                <MyCard darkMode={false} width="100%">
                                    <ListWithIcon items={listItems}/>
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