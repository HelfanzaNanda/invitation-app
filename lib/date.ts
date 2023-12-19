import dayjs from "dayjs"

export const formatNormalDate = (date : string) => dayjs(date).format('DD MMMM YYYY HH:mm:ss')