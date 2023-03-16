import { utils } from '../js/util.js';
import reservationsById from '../service/reservationsById-services.js';

export default function showReservations() {
    const table = document.querySelector('[data-table-events]');
    const tbody = document.querySelector('[data-tableListReserv]');
    const cloneReserv = document.querySelector('[data-cloneReserv]');

    const vr = document.getElementsByClassName('verReservas');
    const vrArray = Array.from(vr);

    function handleClick(event) {
        const id = this.parentElement.parentElement.dataset.id;
        reservationsById(id, cloneReserv, tbody);
    }

    vrArray.forEach((e) => {
        e.addEventListener('click', handleClick);
    });

    table.addEventListener('click', async (event) => {
        const tr = event.target.closest('[data-id]');
        const id = tr.dataset.id;

        const isBtnExcluir = event.target.classList.contains('btn-excluir');
        const isBtnReserva = event.target.classList.contains('btn-reserva');

        if (isBtnExcluir) {
            localStorage.setItem('EVENT_ID', id);
        }
    });

    const modal = document.getElementById('eventBookings');
    modal.addEventListener('hidden.bs.modal', function (event) {
        const reservList = document.querySelectorAll('[data-cloneReserv]');

        reservList.forEach((element) => {
            element.remove();
        });
        const modalBodyMsg = document.querySelector('[data-modal-body-msg]');
        utils.hideElement(modalBodyMsg, true);
    });
}
