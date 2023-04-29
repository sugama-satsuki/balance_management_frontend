
/*
 * 0 : エラーなし
 * 1 : 特殊文字を含む
 * 2 : 入力タイプが違う
 * 3 : 必須項目が空
 */
export type ErrorType = 0 | 1 | 2 | 3;


// 0~2:成功、3:特殊文字を含む、4:入力タイプが違う、5:必須項目が空、6:登録失敗
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
export type MsgType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9


export const messageList = [
    { type: 's', msg: '正常に登録しました。', id: 'S001'},
    { type: 's', msg: '正常に更新しました。', id: 'S002'},
    { type: 's', msg: '正常に削除しました。', id: 'S003'},
    { type: 'e', msg: '●●に特殊文字が入力されました。', id: 'E001'},
    { type: 'e', msg: '〇〇は▲▲で入力してください。。', id: 'E002'},
    { type: 'e', msg: '〇〇が空です。必ず入力してください。', id: 'E003'},
    { type: 'e', msg: '登録に失敗しました。', id: 'E004'},
    { type: 'e', msg: '更新に失敗しました。', id: 'E005'},
    { type: 'e', msg: '削除に失敗しました。', id: 'E006'},
    { type: 'e', msg: '削除する行にチェックを入れてから削除ボタンを押してください。', id: 'E007'}
]



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
export const itemWidth:number[] = [ 0, 0, 4, 4, 4, 3, 5 ];


enum DateFormat {
    YY_MM_DD_dd = 'YYYY/MM/DD(dd)',
    MM_DD_dd = 'MM/DD(dd)',
}