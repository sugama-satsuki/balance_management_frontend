import { DataStateType } from "../types/global";


// 日毎の収支合計を返す関数
export const pickOutDayData = (amountList: DataStateType, termsYear: number, termsMonth: number, termsDate: number) => {

    let result: DataStateType[] = [];

    amountList.forEach((val, i) => {
        let valDate  = new Date(val.date);
        // 同じ月だったら
        if(valDate.getFullYear() === termsYear && valDate.getMonth() === termsMonth && valDate.getDate() === termsDate) {
            result.push(val);
        }
    })

    return result;
}