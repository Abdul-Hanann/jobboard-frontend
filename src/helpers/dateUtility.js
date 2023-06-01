import moment from "moment"
const SERVER_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"
const SERVER_DATE_FORMAT_JUST_DATE = "YYYY-MM-DD"
const LOCAL_DATE_FORMAT = "d MMM YYYY"

export const getCurrentDateTime = () => {
  return moment().local().format(SERVER_DATE_FORMAT)
}

export const convertToLocal = dateTime => {
  return moment(dateTime).format(LOCAL_DATE_FORMAT)
}
