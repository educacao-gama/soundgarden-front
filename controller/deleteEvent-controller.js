import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';
import { error } from '../js/error.js';

const deleteEvent = async () => {
    const form = document.querySelector('[data-form]');
    utils.hideElement(form, true);

    const id = window.localStorage.getItem('EVENT_ID');

    const inputNome = document.getElementById('nome');
    const inputBanner = document.getElementById('banner');
    const inputAtracoes = document.getElementById('atracoes');
    const inputDescricao = document.getElementById('descricao');
    const inputData = document.getElementById('data');
    const inputLotacao = document.getElementById('lotacao');

    const errorDiv = document.querySelector('[data-error]');

    try {
        const data = await eventsService.eventDetail(id);

        const dateScheduled = utils.dateToLocal(data.scheduled);

        inputNome.value = data.name;
        inputBanner.value = data.poster;
        inputAtracoes.value = `${data.attractions.join(', ')}`;
        inputDescricao.value = data.description;
        inputData.value = dateScheduled;
        inputLotacao.value = data.number_tickets;

        utils.showElement(form, true);
    } catch (erro) {
        console.log(erro);
        utils.hideElement(form, true);
        error.showError(
            'Ops! Algo de errado aconteceu. Você pode tentar novamente em alguns minutos.',
            errorDiv
        );
    } finally {
        const loader = document.querySelector('[data-event-loader]');
        utils.hideElement(loader, true);
    }

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        try {
            await eventsService.removeEvent(id);
            window.localStorage.setItem('SHOW', 'success-remove');
            window.location.href = 'admin.html';
        } catch (erro) {
            console.log(erro);
            error.showError(
                'Ops! Algo de errado aconteceu. Você pode tentar novamente em alguns minutos.',
                errorDiv
            );
            window.scrollTo(0, 0);
        }
    });
};
deleteEvent();
