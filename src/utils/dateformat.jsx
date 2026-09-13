import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date) =>{
    return moment(date.createdAt).locale('th').format('LL')
}