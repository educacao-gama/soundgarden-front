import { bookingsServices } from '../service/bookings-services.js';

const bookTicket = document.getElementById('bookTicket');

bookTicket.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const eventId = button.getAttribute('data-event-id');
    const eventIdInput = bookTicket.querySelector('[data-event-id]');
    eventIdInput.value = eventId;
});

const form = document.querySelector('[data-form]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookTicket = document.getElementById('bookTicket');
    const modalBookTicket = bootstrap.Modal.getInstance(bookTicket);

    const bookTicketSucess = document.getElementById('bookTicketSucess');
    const modalbookTicketSucess =
        bootstrap.Modal.getOrCreateInstance(bookTicketSucess);

    const bookTicketFail = document.getElementById('bookTicketFail');
    const modalbookTicketFail =
        bootstrap.Modal.getOrCreateInstance(bookTicketFail);

    try {
        const name = event.target.querySelector('[data-name]').value;
        const email = event.target.querySelector('[data-email]').value;
        const tickets = event.target.querySelector('[data-tickets]').value;
        const eventId = event.target.querySelector('[data-event-id]').value;

        if (!name || !email || !tickets) {
            return console.log('Nome, email ou  não preenchidos');
        }

        await bookingsServices.bookingEvent(name, email, tickets, eventId);

        modalBookTicket.toggle();
        modalbookTicketSucess.toggle();
    } catch (erro) {
        modalBookTicket.toggle();
        modalbookTicketFail.toggle();
        console.log(erro);
    }
});
