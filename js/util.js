const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    return newDate.toLocaleDateString('pt-BR', options);
};

const formatDateHourMinute = (date) => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    return newDate.toLocaleDateString('pt-BR', options);
};

const todayDateHour = () => {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    const hour = String(todayDate.getHours()).padStart(2, '0');
    const min = String(todayDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${min}`;
};

const dateJson = (date) => {
    const dateDay = date.substring(8, 10);
    const dateMonth = date.substring(5, 7);
    const dateYear = date.substring(0, 4);
    const dateHour = date.substring(11, 13);
    const dateMin = date.substring(14, 16);

    return `${dateYear}-${dateMonth}-${dateDay}T${dateHour}:${dateMin}:00.000Z`;
};

const dateToLocal = (date) => {
    const dateDay = date.substring(8, 10);
    const dateMonth = date.substring(5, 7);
    const dateYear = date.substring(0, 4);
    const dateHour = date.substring(11, 13);
    const dateMin = date.substring(14, 16);

    return `${dateYear}-${dateMonth}-${dateDay}T${dateHour}:${dateMin}`;
};

const limitString = (string = '', limit = 0) =>
    string.length > limit ? `${string.substring(0, limit)}...` : string;

const showElement = (div, hide) => {
    div.classList.remove('invisible');
    if (hide) {
        div.classList.remove('hide');
    }
};

const hideElement = (div, hide) => {
    div.classList.add('invisible');
    div.classList.remove('visible');
    if (hide) {
        div.classList.add('hide');
    }
};

const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
};

export const utils = {
    formatDate,
    formatDateHourMinute,
    limitString,
    showElement,
    hideElement,
    todayDateHour,
    dateJson,
    dateToLocal,
    isValidUrl,
};
