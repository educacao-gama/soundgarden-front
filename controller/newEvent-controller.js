import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';
import { error } from '../js/error.js';

const inputData = document.getElementById('data');
inputData.value = utils.todayDateHour();
inputData.setAttribute('min', utils.todayDateHour());

const form = document.querySelector('[data-form]');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    try {
        const inputNome = document.getElementById('nome').value;
        const inputBanner = document.getElementById('poster').value;
        const inputAtracoes = document
            .getElementById('atracoes')
            .value.split(', ');
        const inputDescricao = document.getElementById('descricao').value;
        const dataJson = utils.dateJson(inputData.value);
        const inputLotacao = document.getElementById('lotacao').value;

        if (
            !inputNome ||
            !inputBanner ||
            !inputAtracoes ||
            !inputDescricao ||
            !inputData ||
            !inputLotacao
        ) {
            return console.log('Campos não preenchidos');
        }

        await eventsService.newEvent(
            inputNome,
            inputBanner,
            inputAtracoes,
            inputDescricao,
            dataJson,
            inputLotacao
        );

        window.localStorage.setItem('SHOW', 'success-remove');
        window.location.href = 'admin.html';
    } catch (erro) {
        console.log(erro);
        const errorDiv = document.querySelector('[data-error]');
        error.showError(
            'Ops! Algo de errado aconteceu. Você pode tentar novamente em alguns minutos.',
            errorDiv
        );
        window.scrollTo(0, 0);
    }
});
