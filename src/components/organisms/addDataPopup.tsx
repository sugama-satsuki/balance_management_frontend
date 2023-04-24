import React, {useState} from 'react';

/* import mui */ 
import { InputLabel } from '@mui/material';
import { PickerSelectionState } from "@mui/x-date-pickers/internals";

/* import atoms */
import Popup from '../atoms/popup';
import { SquareButton } from '../atoms/button';
import Spacer from '../atoms/spacer';
import axios from 'axios';
import MyRadioGroup from '../molecules/myRadioGroup';

/* import css */
import styles from '../../styles/addDataPopup.module.css';
import MyDatePicker from '../molecules/myDatePicker';
import MyDropDown from '../molecules/myDropDown';



/* type宣言 */ 

// before:処理前、ok、err:必須項目に入力がない、err2:入力タイプが間違っている
type ValidationResultType = 'before' | 'ok' | 'err';

// 0:エラーなし、1:特殊文字を含む、2:入力タイプが違う、3:必須項目が空
type ErrorType = 0 | 1 | 2 |3;

type PropsType = {
    categoryList: {label: string, value: string}[],
    showMsgFlag: [boolean, ErrorType],
    setMsgFlag: Function
}

type ValidationCheckType = {
    name: string,
    type: ValidationResultType
}



export default function AddDataPopup(props: PropsType) {

    const { categoryList, showMsgFlag, setMsgFlag } = props;

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

    const [selectType, setSelectType] = useState<string>(typeList[0].value);
    const [inputDate, setDate] = useState<Date>(new Date());
    const [inputTitle, setTitle] = useState<string>('');
    const [inputAmount, setAmount] = useState<number>();
    const [selectCategory, setCategory] = useState<string>('');
    const [inputMemo, setMemo] = useState<string>('');


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
        setMsgFlag([isInclude, isInclude ? 3 : 0]);  // 特殊文字の有無チェック
        setMsgFlag([!checkNumber(text), checkNumber(text) ? 0 : 4]); // 入力タイプのチェック
        
        setAmount(checkNumber(text) ? Number(text) : 0);
    }
    
    const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // カテゴリ
        setCategory(event.target.value);
    }

    const onChangeDate= (value: Date | null, selectionState?: PickerSelectionState | undefined) => {
        // 日付
        setDate(value === null? new Date(): value);
    }

    const onChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // メモ
        setMemo(event.target.value);
    }



    /* --- その他処理 --- */

    // 文字のエスケープ
    const escape = (text: string):[string, boolean] => {
        // if(typeof text === 'string') {
        // const strText = text;
        // 特殊文字を空にした文字列 と、特殊文字を含むかどうか(含む場合true)を返す
        return [text.replace(/[&'`"<>]/g, ''), text.match(/[&'`"<>]/g) === null ? false : true];
    }

    // タイプチェック
    const checkNumber = (num:string):boolean => {
        // 数字が入力されてるかどうかチェック

        let newNum = num;

        // 全角文字チェック
        if (newNum.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)) {    
            // 半角に変換
            newNum = newNum.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
            
        }

        // numが数字だったらtrueを返す
        return !isNaN(Number(newNum));
    }

    // 必須チェック
    const checkRequire = () => {
        setValidationCheckState([
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
                type: !inputDate ? 'err' : 'ok'
            },
            {
                name: 'memo',
                type: 'ok'
            },
        ])
    }

    // 登録
    const onClickRegisterButton = (e:React.MouseEvent<HTMLButtonElement>) => {

        let errFlag:boolean = false;

        // 入力値チェック
        checkRequire();

        // 入力値にerrがあったら表示する
        validationCheckState.forEach((val) => {
            errFlag = val.type === 'err' ? true : errFlag;
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
        e.preventDefault();

        console.log('call dataRegister')

        try {
            // APIを叩く
            const data = {
                userId: '642e75bea7b120ca2fa41655',
                date: inputDate,
                title: inputTitle,
                amount: inputAmount,
                category: selectCategory,
                isTypeIncome: selectType === 'income',
                memo: inputMemo
            }

            await axios.post('/data/register', data);

        } catch(err) {
            console.log(err);
        }
    }


    /* --- return --- */
    return(
        <>
            <Popup size='l'>
                <div className={styles.popupInner}>
                {/* <ContentsTitle title='新規追加' /> */}
                <form className={styles.smallWidget}>
                    <div className={styles.formItem}>
                        <div><InputLabel id='type-radio-group-label' className={styles.label}>タイプ</InputLabel></div>
                        <div className={styles.inputWidget}>
                            <MyRadioGroup items={typeList} groupName='amountType' changeFunc={onChangeType} selectValue={selectType} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor='expenseName' className={styles.label}>タイトル</label>
                        <div className={styles.inputWidget}>
                            <input type='text' className={styles.input} required placeholder={ selectType === 'expenses' ? '例）〇〇を買った':'例）給料'} onChange={onChangeTitle}  id='expenseName' value={inputTitle}/>
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
                            <MyDatePicker changeFunc={onChangeDate} value={inputDate} />
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
                            <SquareButton text='登録' type={'submit'} fill onClick={onClickRegisterButton}/>
                        </Spacer>
                    </div>
                </form>
                </div>
            </Popup>
        </>
    )
}