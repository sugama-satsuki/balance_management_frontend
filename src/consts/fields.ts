
export const fields = {
    // メッセージ一覧
    messageList: [
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
    ],
    // テーブルの横幅指定
    tableCellWidth: [ 0, 0, 4, 4, 4, 3, 5 ]
}