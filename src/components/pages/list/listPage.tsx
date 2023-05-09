import React, { useEffect, useState } from 'react';

/* import css */
import styles from './listPage.module.css';

/* import atoms */
import Tag from '../../atoms/tag,/tag';
import { SquareButton } from '../../atoms/button/button';
import Spacer from '../../atoms/spacer/spacer';

/* import molecules */
import MyTable from '../../molecules/table/table';
import MsgBanner from '../../molecules/bunner/msgBanner';

/* import organisms */
import AddDataPopup from '../../organisms/add_data_popup/addDataPopup';

/* import templates */
import BaseLayout from '../../template/base_layout/baseLayout';

/* import mui */
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

/* import axios */
import axios, { AxiosRequestConfig } from 'axios';

import { MsgType, DataStateType } from '../../../types/global';

import { fields } from '../../../consts/fields';


// 型宣言
type DataType = {
    amount: string,
    category: string,
    isTypeIncome: boolean,
    memo: string,
    title: string,
    userId: string,
    date: Date,
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



export default function ListPage() {

    const [incomeData, setIncomeData] = useState<DataStateType[]>([]);
    const [expensesData, setExpensesData] = useState<DataStateType[]>([]);
    const [displayDataState, setDisplayDataState] = useState<string>('income');
    const [categoryList, setCategoryList] = useState<CategoryDataType>([]);

    const [openFlag, setOpenFlag] = useState<boolean>(false);

    const [selectData, setSelectData] = useState<DataStateType>(['income', 0, '', 0, new Date(), '']);

    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    // エラーメッセージの表示非表示フラグ
    const [showMsgBnr, setShowMsgBnr] = useState<[boolean, MsgType]>([false, 0]);

    useEffect(() => {
        fetchData();
    }, []);


    // データ取得
    const fetchData = async () => {
        const income = await axios.get("/data/income/642e75bea7b120ca2fa41655");
        const expenses = await axios.get("/data/expenses/642e75bea7b120ca2fa41655");
        const categoryList = await axios.get('/category/allData');


        setIncomeData([
            [0, false, 'カテゴリ', '収入名', '金額', '日付', 'メモ'],
            ...income.data.map((val:DataType, index:number) => {
                return (
                    [
                        val._id, 
                        false, 
                        <Tag text={val.category} bgColor='--my-color-orange' small/>, 
                        val.title, 
                        '¥' + val.amount.toLocaleString(), 
                        val.date, 
                        val.memo
                    ]
                )
            })
        ]);

        setExpensesData([
            [0, false, 'カテゴリ', '支出名', '金額', '日付', 'メモ'],
            ...expenses.data.map((val:DataType, index:number) => {
                return (
                    [
                        val._id, 
                        false, 
                        <Tag text={val.category} bgColor='--my-color-orange' small/>, 
                        val.title, 
                        '¥' + val.amount.toLocaleString(), 
                        val.date, 
                        val.memo
                    ]
                )
            })
        ]);

        // 新規登録ポップアップに渡す カテゴリ一覧のセット
        setCategoryList([
            { label: '-- カテゴリを選択 --', value: '' },
            ...categoryList.data.map((val: CategoryType, index: number) => {
                return (
                    {label: val.label, value: val.category_key}
                )
            })
        ]);

        setUpdateFlag(false);
    }




    

    // データ削除
    const onClickDeleteData = () => {

        let deleteItemIdArr:{id: string}[] = [];
        let count:number = 0;

        // チェックのついている項目を確認
        if(displayDataState === 'income'){
            incomeData.forEach((val:DataStateType) => {
                if(count > 0 && val[1]) {
                    deleteItemIdArr.push({id: val[0]});
                }
                count ++;
            }) 
        }else{
            expensesData.forEach((val:DataStateType) => {
                if(count > 0 && val[1]) {
                    deleteItemIdArr.push({id: val[0]});
                }
                count ++;
            })
        }

        if(deleteItemIdArr.length === 0) {
            // warningを出す
            setShowMsgBnr([true, 9])
        }else{
            // 削除
            deleteData(deleteItemIdArr);
        }

    }



    const setData = (data: DataStateType) => {
        setSelectData([displayDataState, data[2].props.text, data[3], data[4], new Date(data[5]), data[6]]);
    }

    // セル押下時処理
    const onClickTableRow = (data: DataStateType) => {
        setUpdateFlag(true);
        setData(data);
        setOpenFlag(true);
    }



    // データの削除
    const deleteData = async (delDataIdArr:{id: string}[]) => {
        const idArr: AxiosRequestConfig = {
            data: [
                ...delDataIdArr
            ]
        }
        await axios.delete('/data/delete', idArr);
    }


    // テーブルのチェックボックスに全チェック入れる関数
    const TableAllCheck = (chkFlag: boolean):void => {

        if(displayDataState === 'income'){

            setIncomeData([
                ...incomeData.map((val:DataStateType) => {
                    return [
                        val[0], 
                        !chkFlag, 
                        val[2], 
                        val[3], 
                        val[4], 
                        val[5], 
                        val[6]
                    ]
                })
            ]);

        }else{

            setExpensesData([
                ...expensesData.map((val:DataStateType) => {
                    return [
                        val[0], 
                        !chkFlag, 
                        val[2], 
                        val[3], 
                        val[4], 
                        val[5], 
                        val[6]
                    ]
                })
            ]);

        }
    }

    // テーブルのチェックを保持する関数
    const TableCheck = (num: number, chkFlag: boolean):void => {

        if(displayDataState === 'income'){
            setIncomeData([
                ...incomeData.map((val:DataStateType) => {
                    if(val[0] === num) val[1] = !chkFlag;
                    return val;
                })
            ])
        }else{
            setExpensesData([
                ...expensesData.map((val:DataStateType) => {
                    if(val[0] === num) val[1] = !chkFlag;
                    return val;
                })
            ])
        }
    }


    // カレンダー押下時処理
    const onChangeSelect = (event: SelectChangeEvent) => {
        setDisplayDataState(event.target.value as string);
    }

    // 登録ポップアップに渡す関数
    const changeBnrDisplay = (msgBnrVal:[boolean, MsgType]) => {
        setShowMsgBnr(msgBnrVal);
    }

    // ポップアップ表示/非表示
    const changePopup = () => {
        setOpenFlag(!openFlag);
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
                        <div className={styles.marginR_s}><SquareButton text='新規追加' secondary onClick={changePopup}/></div>
                        <SquareButton text='削除' onClick={onClickDeleteData}/>
                    </div>
                </div>

                <AddDataPopup 
                    categoryList={categoryList} 
                    showMsgFlag={showMsgBnr} 
                    setMsgFlag={changeBnrDisplay} 
                    openFlag={openFlag} 
                    onClickCloseBtn={changePopup} 
                    reloadData={fetchData} 
                    data={selectData} 
                    isUpdate={updateFlag} 
                />
                
                <Spacer size='s'>
                    <div className={styles.listWrapper}>
                        <MyTable items={displayDataState === 'income'? incomeData:expensesData} showCheckBox itemWidth={fields.tableCellWidth} name='itemList' allCheckFunc={TableAllCheck} cellCheckFunc={TableCheck} onClickTableRow={onClickTableRow} />
                    </div>
                </Spacer>
            </div>
        </BaseLayout>
    )
}
