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

export const utils = {
    formatDate,
    limitString,
    showElement,
    hideElement,
};
