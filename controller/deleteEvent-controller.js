import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';
import { error } from '../js/error.js';

const deleteEvent = async () => {
    const getURL = new URL(window.location);
    const id = getURL.searchParams.get('id');

    const inputNome = document.getElementById('nome');
    const inputBanner = document.getElementById('banner');
    const inputAtracoes = document.getElementById('atracoes');
    const inputDescricao = document.getElementById('descricao');
    const inputData = document.getElementById('data');
    const inputLotacao = document.getElementById('lotacao');

    const errorDiv = document.querySelector('[data-error]');
    const form = document.querySelector('[data-form]');
    utils.hideElement(form, true);

    try {
        utils.showElement(form, true);

        const data = await eventsService.eventDetail(id);
        const dateScheduled = utils.dateToLocal(data.scheduled);

        inputNome.value = data.name;
        inputBanner.value = data.poster;
        inputAtracoes.value = `${data.attractions.join(', ')}`;
        inputDescricao.value = data.description;
        inputData.value = dateScheduled;
        inputLotacao.value = data.number_tickets;
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
            window.location.href = 'admin.html?show=success-remove';
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
