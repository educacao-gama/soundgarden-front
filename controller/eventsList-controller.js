import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';
import { error } from '../js/error.js';
import { warning } from '../js/warning.js';

const createEventCard = (name, scheduled, attractions, description, id) => {
    const cardEvent = document.createElement('article');
    const content = `
        <h2>${name} - ${utils.formatDate(scheduled)}</h2>
        <h4>${attractions.join(' · ')}</h4>
        <p>${utils.limitString(description, 100)}</p>
        <span class="mt-auto d-grid">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookTicket" data-event-id="${id}">reservar ingresso</button>
        </span>
    `;
    cardEvent.classList.add('evento', 'card', 'p-5', 'm-3');
    cardEvent.innerHTML = content;

    const today = new Date();
    if (scheduled < today.toISOString()) {
        const span = cardEvent.querySelector('span');
        span.setAttribute('tabindex', '0');
        span.setAttribute('data-bs-toggle', 'popover');
        span.setAttribute('data-bs-placement', 'top');
        span.setAttribute('data-bs-trigger', 'hover focus');
        span.setAttribute('data-bs-content', 'Esse evento já foi');
        const btn = cardEvent.querySelector('button');
        btn.setAttribute('disabled', true);
    }

    return cardEvent;
};

const renderCards = async (limit) => {
    const eventsSection = document.querySelector('[data-event-section]');
    const eventsDiv = document.querySelector('[data-event]');

    try {
        const eventsList = await eventsService.eventsList();

        const eventsListOrderByDate = eventsList.sort((a, b) => {
            return new Date(b.scheduled) - new Date(a.scheduled);
        });

        const eventsListBiggerToday = eventsListOrderByDate.filter(
            (dataEvent) => {
                const today = new Date();
                return dataEvent.scheduled > today.toISOString();
            }
        );

        const events = limit ? eventsListBiggerToday : eventsListOrderByDate;

        if (eventsListBiggerToday.length === 0) {
            warning.showWarning(
                'Não temos nenhum evento futuro no momento.',
                eventsDiv
            );
        }

        for (let i = 0; i < events.length; i++) {
            eventsDiv.appendChild(
                createEventCard(
                    events[i].name,
                    events[i].scheduled,
                    events[i].attractions,
                    events[i].description,
                    events[i]._id
                )
            );

            if (limit && i === 2) {
                break;
            }
        }

        if (limit && eventsList != 0) {
            const moreEventsLink = document.createElement('div');
            const content = `<a href="eventos.html" class="btn btn-secondary">ver todos os eventos</a>`;
            moreEventsLink.classList.add('container', 'text-center');
            moreEventsLink.innerHTML = content;
            eventsSection.append(moreEventsLink);
        }
    } catch (erro) {
        error.showWarning(
            'Ops! Algo de errado aconteceu. Você pode tentar novamente em alguns minutos.',
            eventsDiv
        );
        console.log(erro);
    } finally {
        const loader = document.querySelector('[data-event-loader]');
        utils.hideElement(loader, true);
    }
};

export const cards = {
    renderCards,
};
