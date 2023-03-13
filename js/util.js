const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
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
        timeZone: 'UTC',
    };

    return newDate.toLocaleDateString('pt-BR', options);
};

const limitString = (string = '', limit = 0) =>
    string.length > limit ? `${string.substring(0, limit)}...` : string;

const showElement = (div, hide) => {
    div.classList.add('visible');
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

const todayDateHour = () => {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    const hour = String(todayDate.getHours()).padStart(2, '0');
    const min = String(todayDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${min}`;
};

export const utils = {
    formatDate,
    formatDateHourMinute,
    limitString,
    showElement,
    hideElement,
    todayDateHour,
};
