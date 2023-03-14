export default function closeReservModal(button, element) {
  button.addEventListener('click', () => {
    const reservList = document.querySelectorAll('[data-cloneReserv]');
    const error = document.querySelector('.admErrorReservations');
    const loader = document.querySelector('[data-loader2]');
    reservList.forEach((element) => {
      element.remove();
    });
    error.style.display = 'none';
    loader.removeAttribute('style');
    element.setAttribute('data-activeReserv', 'false');
  });
}
