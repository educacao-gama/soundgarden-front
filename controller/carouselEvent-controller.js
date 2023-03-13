import { eventsService } from '../service/events-services.js';
import { utils } from '../js/util.js';

const createEventCarouselItem = (
    name,
    scheduled,
    attractions,
    description,
    poster,
    id,
    active
) => {
    const carouselItem = document.createElement('div');
    const content = `
    <img src="${poster}" class="d-block carousel-img" alt="${name}">
    <div class="carousel-caption">
        <h4>${name} - ${utils.formatDate(scheduled)}</h4>
        <h5>${attractions.join(' · ')}</h5>
        <p>${utils.limitString(description, 100)}</p>
        <button type="button" class="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#bookTicket" data-event-id="${id}">
            reservar ingresso
        </button>
    </div>
    `;

    carouselItem.classList.add('carousel-item');
    active ? carouselItem.classList.add('active') : '';
    carouselItem.dataset.id = id;
    carouselItem.innerHTML = content;
    return carouselItem;
};

const eventCarousel = async () => {
    try {
        const eventsList = await eventsService.eventsList();

        const carouselInner = document.querySelector(
            '#event-carousel > .carousel-inner'
        );

        for (let i = 0; i < eventsList.length; i++) {
            const banner = utils.isValidUrl(eventsList[i].poster)
                ? eventsList[i].poster
                : 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

            carouselInner.appendChild(
                createEventCarouselItem(
                    eventsList[i].name,
                    eventsList[i].scheduled,
                    eventsList[i].attractions,
                    eventsList[i].description,
                    banner,
                    eventsList[i]._id,
                    i === 0 ? true : false
                )
            );
            if (i === 5 || i === eventsList.length) {
                break;
            }
        }
    } catch (erro) {
        const carouselSection = document.getElementById(
            'event-carousel-section'
        );
        utils.hideElement(carouselSection, true);
        console.log(erro);
    } finally {
        const loader = document.querySelector('[data-carousel-loader]');
        utils.hideElement(loader, true);
    }
};

eventCarousel();
