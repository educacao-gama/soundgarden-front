export default function reservationsById(id, clone, tbody) {
  console.log(id);
  async function resevations(id) {
    try {
      const url = 'https://soundgarden-api.vercel.app/bookings/event/' + id;
      const responseReservations = await fetch(url);
      return await responseReservations.json();
    } catch {
      console.log('entrou');
      const error = document.querySelector('.admErrorReservations');
      error.innerText =
        'Não foi possivel conectar ao servidor, por favor tente mais tarde!';
      error.removeAttribute('style');
      console.log(erro);
    } finally {
      const loader = document.querySelector('[data-loader2]');
      loader.style.display = 'none';
    }
  }

  resevations(id).then((resevations2) => {
    console.log(resevations2);

    resevations2.forEach((element, index) => {
      const newClone = clone.cloneNode(true);
      newClone.children[0].innerText = index + 1;
      newClone.children[1].innerText = element.owner_name;
      newClone.children[2].innerText = element.owner_email;
      newClone.children[3].innerText = element.number_tickets;
      newClone.children[4].innerText = element._id;
      newClone.removeAttribute('style');
      console.log(newClone);
      tbody.appendChild(newClone);
    });

    if (resevations2.length == 0) {
      const error = document.querySelector('.admErrorReservations');
      error.innerText = 'Este evento ainda não tem reservas';
      error.removeAttribute('style');
    }
  });
}
