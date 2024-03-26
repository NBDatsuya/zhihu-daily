export const getTodayTime = () => {
    const date = new Date()

    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date.getTime()
}

export const getPrevDay = (timeStamp = (new Date()).getTime()) => {
    let date = new Date(timeStamp);
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1 < 10 ?
        '0' + (date.getMonth() + 1) :
        date.getMonth() + 1).toString()
    let day = (date.getDate() < 10 ?
        '0' + (date.getDate()) :
        date.getDate()).toString()

    return year + month + day
}