
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
import { Box, Grid } from '@mui/material';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';

import { DataSeriesType, IdWithTextType, MonthlyDataType, ReportDatesType } from "../../../types/global";

import { format } from "date-fns";



type PropsType = {
    reportDateData: ReportDatesType,
    changeReportMonth: (action: 'next' | 'back') => void,
    tabItems: IdWithTextType[],
    tabSelectVal: string,
    setTabState: (id:string) => void,
    monthlyIncome: MonthlyDataType,
    monthlyExpenses: MonthlyDataType,
    seriesData: DataSeriesType
}


export default function ReportArea(props: PropsType) {

    const {reportDateData, changeReportMonth, tabItems, tabSelectVal, setTabState, monthlyIncome, monthlyExpenses, seriesData} = props;

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
    );
}