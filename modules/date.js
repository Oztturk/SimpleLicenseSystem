
var addDaysToday = (days) => {
    var date = new Date()
    date.setDate(date.getDate() + days)
    return date
}

var addDaysToCustomDate = (date,days) => {
    var date = new Date(date)
    date.setDate(date.getDate() + days)
    return date
}


export {
    addDaysToCustomDate,
    addDaysToday
};