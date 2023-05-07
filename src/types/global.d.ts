import { SeriesOptionsType } from "highcharts";

/*
 * 0 : エラーなし
 * 1 : 特殊文字を含む
 * 2 : 入力タイプが違う
 * 3 : 必須項目が空
 */
export type ErrorType = 0 | 1 | 2 | 3;


/*
 * 0 : 登録成功
 * 1 : 更新成功
 * 2 : 削除成功
 * 3 : 特殊文字を含むエラー
 * 4 : 入力タイプが違うエラー
 * 5 : 必須項目が空エラー
 * 6 : 登録失敗エラー
 * 7 : 更新失敗エラー
 * 8 : 削除失敗エラー
 * 9 : 未選択での削除ボタン押下時エラー
 */
type MsgType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;



// データ
/*
    id: number,
    checkFlag: boolean,
    category: React.ReactNode,
    title: string,
    amount: string,
    date: string,
    memo: string
*/
export type DataStateType = any[];


export type DataSeriesType = {
    income: SeriesOptionsType,
    expenses: SeriesOptionsType
}