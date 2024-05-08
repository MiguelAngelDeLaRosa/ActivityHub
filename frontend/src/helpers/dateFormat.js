import moment from 'moment';

export const formatDate = (date) => {
    const originalDate = moment(date);
    const formatDate = originalDate.format('DD/MM/YYYY');
    return formatDate;
}

export const formatDateEdit = (date) => {
    const originalDate = moment(date);
    const formatDate = originalDate.format('YYYY-MM-DD'); // Cambiar el formato a 'YYYY-MM-DD'
    return formatDate;
}
