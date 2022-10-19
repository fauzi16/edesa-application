import moment from 'moment';
import 'moment/locale/id';

export const IDR = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

export const dateTimeFormat = (string) => {
    const dateTime = moment(string).format('DD MMMM YYYY, HH:mm:ss');
    return dateTime;
}

export const dateWithFullMonth = (string) => {
    const date = moment(string).format('DD MMMM YYYY');
    return date;
}

export const dateBrowser = (string) => {
    const dateTime = moment(string).format('DD/MM/YYYY');
    return dateTime;
}

export const dateDefault = (string) => {
    const dateTime = moment(string).format('YYYY-MM-DD');
    return dateTime;
}

export const dateSearch = (string) => {
    const dateTime = moment(string).format('YYYY-M-D');
    return dateTime;
}
// export const url = process.env.API_URL_PROD