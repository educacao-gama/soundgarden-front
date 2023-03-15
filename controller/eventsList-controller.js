import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';
import { error } from '../js/error.js';

const createEventCard = (name, scheduled, attractions, description, id) => {
    const cardEvent = document.createElement('article');
    const content = `
        <h2>${name} - ${utils.formatDate(scheduled)}</h2>
        <h4>${attractions.join(' · ')}</h4>
        <p>${utils.limitString(description, 100)}</p>
        <button type="button" class="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#bookTicket" data-event-id="${id}">
            reservar ingresso
        </button>
    `;
    cardEvent.classList.add('evento', 'card', 'p-5', 'm-3');
    cardEvent.dataset.id = id;
    cardEvent.innerHTML = content;
    return cardEvent;
};

const renderCards = async (limit) => {
    const eventsSection = document.querySelector('[data-event-section]');
    const eventsDiv = document.querySelector('[data-event]');

    try {
        const eventsList = await eventsService.eventsList();

        const eventsListOrderByDate = eventsList.sort((a, b) => {
            console.log(new Date(b.scheduled) - new Date(a.scheduled));
            return new Date(b.scheduled) - new Date(a.scheduled);
        });

        const eventsListBiggerToday = eventsListOrderByDate.filter(
            (dataEvent) => {
                const today = new Date();
                console.log(dataEvent.scheduled > today.toISOString());
                return dataEvent.scheduled > today.toISOString();
            }
        );

        const events = limit ? eventsListBiggerToday : eventsListOrderByDate;

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

        if (limit && eventsListBiggerToday.length > 3) {
            const moreEventsLink = document.createElement('div');
            const content = `<a href="eventos.html" class="btn btn-secondary">ver todos os eventos</a>`;
            moreEventsLink.classList.add('container', 'text-center');
            moreEventsLink.innerHTML = content;
            eventsSection.append(moreEventsLink);
        }
    } catch (erro) {
        error.showError(
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
