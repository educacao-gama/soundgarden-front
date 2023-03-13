import { eventsService } from '../service/events-services.js';

async function listManager() {
    try {
        const clone = document.querySelector('[data-clone]');
        const tbody = document.querySelector('[data-tableList]');

        const eventsList = await eventsService.eventsList();

        if (clone && tbody) {
            if (eventsList.length == 0) {
                const admError = document.querySelector('.admError');
                console.log(admError);
                admError.removeAttribute('style');
                admError.children[0].innerText =
                    'Não temos nenhum evento no momento!';
            }
            eventsList.forEach((element, index) => {
                let newClone = clone.cloneNode(true);
                newClone.removeAttribute('style');

                newClone.children[0].innerText = index + 1;

                const newInitialDate = eventsList[index].scheduled
                    .replace(/[-]/g, '/')
                    .replace('T', ' ')
                    .slice(0, 16)
                    .split(' ');

                const newInitialDay = newInitialDate[0]
                    .split('/')
                    .reverse()
                    .join('/');

                const newInitialHour = newInitialDate[1];

                const newInitialDate2 = newInitialDay + ' ' + newInitialHour;

                newClone.children[1].innerText = newInitialDate2;
                newClone.children[2].innerText = eventsList[index].name;
                newClone.children[3].innerText =
                    eventsList[index].attractions.join(', ');

                let nId = eventsList[index]._id;
                newClone.children[4].querySelector(
                    '.btn-reservas'
                ).href += `?id=${nId}`;
                newClone.children[4].querySelector(
                    '.btn-editar'
                ).href += `?id=${nId}`;
                newClone.children[4].querySelector(
                    '.btn-excluir'
                ).href += `?id=${nId}`;

                tbody.appendChild(newClone);
            });
        }
    } catch (erro) {
        const admError = document.querySelector('.admError');
        console.log(admError);
        admError.removeAttribute('style');
        admError.children[0].innerText =
            'Ops, ocorreu um erro na busca dos dados! Tente novamente mais tarde';
        console.log(erro);
    } finally {
        const loader = document.querySelector('[data-loader]');
        loader.style.display = 'none';
    }
}

listManager();