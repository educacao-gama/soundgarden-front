import reservationsById from '../service/reservationsById-services.js';
import closeReservModal from '../js/closeReservModal.js';
export default function showReservations() {
  const vr = document.getElementsByClassName('verReservas');
  const button = document.querySelector('.reservationsModal-close');
  const reservModal = document.querySelector('.reservationsModal');
  const tbody = document.querySelector('[data-tableListReserv]');
  const cloneReserv = document.querySelector('[data-cloneReserv]');

  const vrArray = Array.from(vr);

  function handleClick(event) {
    reservModal.setAttribute('data-activeReserv', 'true');
    closeReservModal(button, reservModal);
    const id = this.parentElement.parentElement.dataset.id;
    reservationsById(id, cloneReserv, tbody);
  }

  vrArray.forEach((e) => {
    e.addEventListener('click', handleClick);
  });
}
