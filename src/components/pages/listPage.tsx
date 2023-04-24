import React, { useEffect, useState } from 'react';

/* import css */
import styles from '../../styles/page/listPage.module.css';
import btnStyles from '../../styles/atoms/button.module.css';

/* import atoms */
import Tag from '../atoms/tag';
import { SquareButton } from '../atoms/button';
import Spacer from '../atoms/spacer';

/* import molecules */
import MyTable from '../molecules/table';

/* import organisms */
import AddDataPopup from '../organisms/addDataPopup';

/* import templates */
import BaseLayout from '../template/baseLayout';

/* import mui */
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import MsgBanner from '../molecules/msgBanner';


// 型宣言
type DataStateType = React.ReactNode[][];
type DataType = {
    amount: string,
    category: string,
    isTypeIncome: Boolean,
    memo: string,
    title: string,
    userId: string,
    __v: string,
    _id: string
};
type CategoryType = {
    _id: string,
    category_key: number,
    label: string,
    color: string,
    isActive: boolean,
    __v: string
}
type CategoryDataType = {label: string, value: string}[];

// 0:エラーなし、1:特殊文字を含む、2:入力タイプが違う、3:必須項目が空
type ErrorType = 0 | 1 | 2 |3;



export default function ListPage() {

    const itemWidth:number[] = [ 4, 4, 4, 3, 5 ];

    const [incomeData, setIncomeData] = useState<DataStateType>([]);
    const [expensesData, setExpensesData] = useState<DataStateType>([]);
    const [displayDataState, setDisplayDataState] = useState<string>('income');
    const [categoryList, setCategoryList] = useState<CategoryDataType>([]);

    // エラーメッセージの表示非表示フラグ
    const [showMsgBnr, setShowMsgBnr] = useState<[boolean, ErrorType]>([false, 0]);

    useEffect(() => {

        const fetchData = async () => {
            const income = await axios.get("/data/income/642e75bea7b120ca2fa41655");
            const expenses = await axios.get("/data/expenses/642e75bea7b120ca2fa41655");
            const categoryList = await axios.get('/category/allData');

            // TODO:Tableコンポーネントに渡ってきたデータが0行だったら、表示するデータがありませんメッセージを表示
            setIncomeData([
                ['カテゴリ', '収入名', '金額', '日付', '備考'],
                ...income.data.map((val:DataType, index:Number) => {
                    return (
                        [<Tag text={val.category} bgColor='--my-color-orange' small/>, val.title, '¥' + val.amount.toLocaleString(), '2023/03/20', val.memo]
                    )
                })
            ]);
            setExpensesData([
                ['カテゴリ', '支出名', '金額', '日付', '備考'],
                ...expenses.data.map((val:DataType, index:Number) => {
                    return (
                        [<Tag text={val.category} bgColor='--my-color-orange' small/>, val.title, '¥' + val.amount.toLocaleString(), '2023/03/20', val.memo]
                    )
                })
            ]);

            setCategoryList([
                { label: '-- カテゴリを選択 --', value: '' },
                ...categoryList.data.map((val: CategoryType, index: number) => {
                    return (
                        {label: val.label, value: val.category_key}
                    )
                })
            ]);
        }

        fetchData();
    }, []);


    const onClickDeleteData = () => {
        console.log('onClick new data');
    }


    // カレンダー押下時処理
    const onChangeSelect = (event: SelectChangeEvent) => {
        setDisplayDataState(event.target.value as string);
    }

    // 登録ポップアップに渡す関数
    const changeBnrDisplay = (flag: boolean, num: ErrorType) => {
        setShowMsgBnr([flag, num]);
    }


    return(
        <BaseLayout menuNumber={2} pageTitle={'一覧'}>
            {/* TODO: エラーメッセージ、エラータイプの受け渡し方法考える */}
            <MsgBanner msgType={ showMsgBnr[1] === 0 || showMsgBnr[1] === 1 || showMsgBnr[1] === 2 ? 's' : 'e'} 
                msgNum={ showMsgBnr[1] } show={ showMsgBnr[0] }
                onClickFunc={(e:any) => {setShowMsgBnr([false, 0])}}
            />
            <div>
                <div className={styles.headArea}>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="simple-select-label">収入/支出を選択</InputLabel>
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                value={displayDataState}
                                label="収入/支出を選択"
                                onChange={onChangeSelect}
                                size="small"
                            >
                                <MenuItem value={'income'}>収入</MenuItem>
                                <MenuItem value={'expenses'}>支出</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className={styles.btnWrapper}>
                        <label htmlFor="trigger" className={`${btnStyles.squareButton} ${btnStyles.primary}`}>新規追加</label>
                        <SquareButton text='削除' onClick={onClickDeleteData}/>
                    </div>
                </div>
                <AddDataPopup categoryList={categoryList} showMsgFlag={showMsgBnr} setMsgFlag={setShowMsgBnr} />
                <Spacer size='s'>
                    <div className={styles.listWrapper}>
                        <MyTable items={displayDataState === 'income'? incomeData:expensesData} showCheckBox itemWidth={itemWidth} />
                    </div>
                </Spacer>
            </div>
        </BaseLayout>
    )
}
