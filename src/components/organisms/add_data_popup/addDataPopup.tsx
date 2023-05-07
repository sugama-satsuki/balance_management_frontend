import React, {useEffect, useState} from 'react';
import axios from 'axios';

/* import css */
import styles from './addDataPopup.module.css';

/* import mui */ 
import { InputLabel } from '@mui/material';
import { PickerSelectionState } from "@mui/x-date-pickers/internals";

/* import atoms */
import Popup from '../../atoms/popup/popup';
import { SquareButton } from '../../atoms/button/button';
import Spacer from '../../atoms/spacer/spacer';
import MyRadioGroup from '../../molecules/radio_group/myRadioGroup';

/* import molecules */ 
import MyDatePicker from '../../molecules/date_piker/myDatePicker2';
import MyDropDown from '../../molecules/dropdown/myDropDown';

import { DataStateType, MsgType } from '../../../types/global';


/* type宣言 */ 

// before:処理前、ok、err:必須項目に入力がない、err2:入力タイプが間違っている
type ValidationResultType = 'before' | 'ok' | 'err';


type PropsType = {
    categoryList: {label: string, value: string}[],
    showMsgFlag: [boolean, MsgType],
    setMsgFlag: (msgBnrVal:[boolean, MsgType]) => void,
    openFlag: boolean,
    onClickCloseBtn: () => void,
    reloadData: () => void,
    data: DataStateType,
    isUpdate: boolean
}

type ValidationCheckType = {
    name: string,
    type: ValidationResultType,
}



export default function AddDataPopup(props: PropsType) {

    const { categoryList, setMsgFlag, openFlag, onClickCloseBtn, reloadData, data, isUpdate } = props;

    const typeList = [
        { label: '収入', value: 'income'},
        { label: '支出', value: 'expenses'}
    ]

    const [validationCheckState, setValidationCheckState] = useState<ValidationCheckType[]>(
        [
            {
                name: 'type',
                type: 'before'
            },
            {
                name: 'title',
                type: 'before'
            },
            {
                name: 'amount',
                type: 'before'
            },
            {
                name: 'category',
                type: 'before'
            },
            {
                name: 'date',
                type: 'before'
            },
            {
                name: 'memo',
                type: 'before'
            },
        ]
    );

    const [selectType, setSelectType] = useState<string>(data[0]);
    const [selectCategory, setCategory] = useState<string>(data[1]);
    const [inputTitle, setTitle] = useState<string>(data[2]);
    const [inputAmount, setAmount] = useState<number>(data[3]);
    const [inputDate, setInputDate] = useState<Date>(data[4]);
    const [inputMemo, setMemo] = useState<string>(data[5]);


    useEffect(() => {

    }, [])

    /* --- stateの更新処理 --- */

    const onChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        // タイプ
        setSelectType(event.target.value);
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        // タイトル
        const [text, isInclude] = escape(event.target.value);
        setMsgFlag([isInclude, isInclude ? 3 : 0]);
        let newText = text;
        setTitle(newText);
    }

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 金額
        const [text, isInclude] = escape(event.target.value);
        const [isNumber, num] = checkNumber(text);
        setMsgFlag([isInclude, isInclude ? 3 : 0]);  // 特殊文字の有無チェック
        setMsgFlag([isNumber, num ? 0 : 4]);         // 入力タイプのチェック
        
        setAmount(num);
    }
    
    const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // カテゴリ
        setCategory(event.target.value);
    }

    const onChangeDate= (value: Date, selectionState?: PickerSelectionState | undefined) => {
        // 日付
        setInputDate(value);
        setInputDate(value);
    }

    const onChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // メモ
        setMemo(event.target.value);
    }



    /* --- その他処理 --- */

    // 文字のエスケープ
    const escape = (text: string):[string, boolean] => {
        // 特殊文字を空にした文字列 と、特殊文字を含むかどうか(含む場合true)を返す
        return [text.replace(/[&'`"<>]/g, ''), text.match(/[&'`"<>]/g) === null ? false : true];
    }

    // タイプチェック
    const checkNumber = (num:string):[boolean, number] => {
        // 数字が入力されてるかどうかチェック

        let newNum = num;

        // 全角文字チェック
        if (newNum.match(/[\x01-\x7E\uFF65-\uFF9F]/)) {
            // 半角に変換
            newNum = newNum.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        }

        // numが数字だったらtrueを返す
        return [isNaN(Number(newNum)), isNaN(Number(newNum)) ? 0 : Number(newNum)];
    }

    // 必須チェック
    const checkRequire = () => {

        const validationCheck:ValidationCheckType[] = [
            {
                name: 'type',
                type: !selectType ? 'err' : 'ok'
            },
            {
                name: 'title',
                type: !inputTitle ? 'err' : 'ok'
            },
            {
                name: 'amount',
                type: !inputAmount ? 'err' : 'ok'
            },
            {
                name: 'category',
                type: !selectCategory ? 'err' : 'ok'
            },
            {
                name: 'date',
                type: !inputDate || inputDate === new Date(1990, 1 - 1, 1, 0, 0, 0, 0) ? 'err' : 'ok'
            },
            {
                name: 'memo',
                type: 'ok'
            },
        ]

        setValidationCheckState(validationCheck);

        return validationCheck;
    }
    

    // 登録ボタン押下時処理
    const onClickRegisterButton = (e:React.MouseEvent<HTMLButtonElement>) => {

        let errFlag:boolean = false;

        const validationCheck = checkRequire();

        // 入力値にerrがあったら表示する
        validationCheck.forEach((val) => {
            errFlag = val.type === 'err' || val.type === 'before' ? true : errFlag;
        });

        // エラーがあったら、登録しない
        if(errFlag){
            setMsgFlag([errFlag, 5]);
        }else{
        // エラーがなかったら登録する
            dataRegister(e);
        }
    }


    // 登録処理
    const dataRegister = async (e:React.MouseEvent<HTMLButtonElement>) => {

        try {
            // APIを叩く
            const data = {
                userId: '642e75bea7b120ca2fa41655',
                date: inputDate.toJSON(),
                title: inputTitle,
                amount: inputAmount,
                category: selectCategory,
                isTypeIncome: selectType === 'income',
                memo: inputMemo
            }

            console.log(data)
            await axios.post('/data/register', data);

            // メッセージの表示
            setMsgFlag([true, 0]);

            // リストデータ再取得
            reloadData();

            // ポップアップを閉じる
            onClickCloseBtn();

        } catch(err) {
            setMsgFlag([true, 6]);
        }
    }

    // TODO：データの更新処理
    const updateData = async () =>  {
        await axios.put('/data/update');
    }


    /* --- return --- */
    return(
        <>
            <Popup size='l' openFlag={openFlag} onClick={onClickCloseBtn}>
                <div className={styles.popupInner}>
                    <div className={styles.smallWidget}>
                        <div className={styles.formItem}>
                            <div><InputLabel id='type-radio-group-label' className={styles.label}>タイプ</InputLabel></div>
                            <div className={styles.inputWidget}>
                                <MyRadioGroup items={typeList} groupName='amountType' changeFunc={onChangeType} selectValue={selectType} />
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor='expenseName' className={styles.label}>タイトル</label>
                            <div className={styles.inputWidget}>
                                <input required
                                    type='text' 
                                    className={styles.input}
                                    placeholder={ selectType === 'expenses' ? '例）〇〇を買った':'例）給料'} 
                                    onChange={onChangeTitle}  
                                    id='expenseName' 
                                    value={inputTitle}
                                />
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor='amount' className={styles.label}>金額</label>
                            <div className={styles.inputWidget}>
                                <input type='text' className={styles.input} required placeholder='例）1000000' onChange={onChangeAmount} id='amount' value={inputAmount}/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label id='category' className={styles.label}>カテゴリー</label>
                            <div className={styles.inputWidget}>
                                <MyDropDown items={categoryList} changeFunc={onChangeCategory} name='category'/>
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label id='date' className={styles.label}>日付</label>
                            <div className={styles.inputWidget}>
                                <MyDatePicker changeFunc={onChangeDate} selectValue={inputDate} />
                            </div>
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor='memo' className={styles.label} >メモ</label>
                            <div className={styles.inputWidget}>
                                <textarea className={styles.input} placeholder='例）自家農園で育てたにんじんが高く売れた！' onChange={onChangeMemo} rows={5} id='memo' value={inputMemo} />
                            </div>
                        </div>
                        <div className={styles.buttonArea}>
                            <Spacer size='xl'>
                                <SquareButton text={isUpdate ? '更新' : '登録'} fill onClick={onClickRegisterButton}/>
                            </Spacer>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}