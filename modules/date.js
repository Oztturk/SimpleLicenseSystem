

var addDays = (days) => {
    var date = new Date()
    date.setDate(date.getDate() + days)
    return date
}


export default addDays;