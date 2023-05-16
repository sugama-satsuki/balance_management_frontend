import { DataStateType } from "../types/global";



// 一致してたら、渡した条件に一致する時のみカウントする関数
export const countMonthAmount = (amountList: DataStateType, terms1: number, terms2: number, countFirstMonth: boolean, terms3?: number, terms4?: number) => {

    let total = 0;
    let total2 = 0;
    let result:number[] = [];

    amountList.forEach((val, i) => {
        let valDate  = new Date(val.date);

        // 当月
        if(valDate.getFullYear() === terms1 && valDate.getMonth() === terms2) {
            total += val.amount;
        }
        // 先月
        if(countFirstMonth){
            if(valDate.getFullYear() === terms3 && valDate.getMonth() === terms4) {
                total2 += val.amount;
            }
        }
    })
    result.push(total);
    if(countFirstMonth) result.push(total2);

    return result;
}



// 日毎の収支合計を返す関数
export const countDayAmount = (amountList: DataStateType, termsYear: number, termsMonth: number, termsDate: number) => {

    let total = 0;

    amountList.forEach((val, i) => {
        let valDate  = new Date(val.date);
        // 同じ月だったら
        if(valDate.getFullYear() === termsYear && valDate.getMonth() === termsMonth && valDate.getDate() === termsDate) {
            total += val.amount;
        }
        
    })

    return total;
}