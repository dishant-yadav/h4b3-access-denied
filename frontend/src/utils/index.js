const convertToTwo = (num) => {
    return num < 10 ? '0' + num : num
}

const getFormattedDate = (date) => {
    const dateData = new Date(date);

    const formattedDate = `${dateData.getFullYear()}/${convertToTwo(dateData.getMonth() + 1)}/${convertToTwo(dateData.getDate())}`
    return formattedDate
}

export {
    convertToTwo, getFormattedDate
}