const eventDiv = document.querySelector("#event-list"); // seletor das divs dos cards
const reservaId = document.querySelector('.reserva'); // seletor da classe reserva no <a> (ver linha 20)
const modalForm = document.querySelector('form'); // seletor do form do modal

async function getEvent() {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events`);

  let events = await response.json();

  for (let i = 0; i < 3; i++) {
    let event = events[i];
    const date = new Date(event.scheduled).toLocaleDateString();

    const cardEvento = `
    <article class="evento card p-5 m-3">
        <h2>${event.name} - ${date}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <a href="#" id=${event._id} class="btn btn-primary reserva" data-toggle="modal" data-target="#cadUsuarioModal">reservar ingresso</a>
    </article>            `;

    eventDiv.innerHTML += cardEvento;
    };
};
// até aqui, o mesmo código de antes
// ---
// função async que vai receber a formdata abaixo
async function postModal(formData) {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/bookings',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const event = await response.json();
    return event;
  } catch(error){
    console.log(error);
  }
}

// Tentativa de fazer uma função onde, ao <a> ser clicado, ele guardasse o valor de Id numa variável
let modalId = function reservaClique {
  let reserva = document.querySelector('.reserva');

  }

// cópia modificada de postEvent
modalForm.addEventListener('submit', event => {
  event.preventDefault();
  const owner_name = event.target.owner_name.value;
  const owner_email = event.target.owner_email.value;
  const number_tickets = 1;
  const event_id = ; // aqui é o X da questão, como por a Id aí?

  const formData = {
    owner_name,
    owner_email,
    number_tickets,
    event_id:
  };

  postModal(formData).then(event => {
    window.location.href = '/'; // talvez não seja necessário essas linhas de código no final, já que o modal fecha sozinho em tese
  });
});


getEvent();