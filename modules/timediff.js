import addDays from "./date.js";

var timeDiff = (days) => {
    const today = addDays(0)
    const leftdate = days
    const diff = Math.abs(leftdate.getTime() - today.getTime());
    const left = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return left
}

export default timeDiff;