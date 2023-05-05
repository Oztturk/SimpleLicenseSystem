import * as time from "./date.js";

var timeDiff = (days) => {
    const today = time.addDaysToday(0)
    const leftdate = days
    const diff = Math.abs(leftdate.getTime() - today.getTime());
    const left = {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
    };
    return left.days + "D " + left.hours + "H " + left.minutes + "M " + left.seconds + "S"
}

export default timeDiff;