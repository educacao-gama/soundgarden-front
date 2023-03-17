import { utils } from '../js/util.js';
import { error } from '../js/error.js';

export default function reservationsById(id, clone, tbody) {
    const tableContainer = document.querySelector('[data-tableReserv]');
    utils.hideElement(tableContainer, true);

    async function resevations(id) {
        try {
            const url =
                'https://soundgarden-api.vercel.app/bookings/event/' + id;
            const responseReservations = await fetch(url);
            return await responseReservations.json();
        } catch {
            utils.hideElement(tableContainer, true);
            const errorDiv = document.querySelector('.admErrorReservations');
            errorDiv.removeAttribute('style');
            error.showError(
                'Não foi possivel conectar ao servidor, por favor tente mais tarde!',
                errorDiv
            );

            console.log(erro);
        } finally {
            const loader = document.querySelector('[data-loader-modal]');
            utils.hideElement(loader, true);
        }
    }

    resevations(id).then((resevations2) => {
        utils.showElement(tableContainer, true);

        resevations2.forEach((element, index) => {
            const newClone = clone.cloneNode(true);
            newClone.children[0].innerText = index + 1;
            newClone.children[1].innerText = element.owner_name;
            newClone.children[2].innerText = element.owner_email;
            newClone.children[3].innerText = element.number_tickets;
            newClone.children[4].innerText = element._id;
            newClone.removeAttribute('style');
            newClone.dataset.idreserv = element._id;

            tbody.appendChild(newClone);
        });

        if (resevations2.length == 0) {
            utils.hideElement(tableContainer, true);
            const modalBodyMsg = document.querySelector(
                '[data-modal-body-msg]'
            );
            utils.showElement(modalBodyMsg, true);
        }
    });
}
