export const GetLastFirstDates = (
    date:number = new Date().getTime()
):{
    firstDay: Date,
    lastDay: Date
} => {
    var monthDate = new Date(date), y = monthDate.getFullYear(), m = monthDate.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    return {
        firstDay,
        lastDay
    }
}