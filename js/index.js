const eventDiv = document.querySelector("#event-list"); 
const modalForm = document.querySelector('form');
const modalId = document.querySelector('#event-id')

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
        <a href="#" data-event-id=${event._id} class="btn btn-primary" data-toggle="modal" data-target="#cadUsuarioModal">reservar ingresso</a>
    </article>            
    `;

    eventDiv.innerHTML += cardEvento;
    };
};

getEvent()

// https://getbootstrap.com/docs/3.3/javascript/#modals
$('#cadUsuarioModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) 
  var recipient = button.data('event-id') 
  var modal = $(this)
  modal.find('#eventid').val(recipient)
});

// enviar formulario

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

modalForm.addEventListener('submit', event => {
  event.preventDefault();
  const owner_name = event.target.name.value;
  const owner_email = event.target.email.value;
  const number_tickets = 1;
  const event_id = event.target.eventid.value;

  const formData = {
    owner_name,
    owner_email,
    number_tickets,
    event_id
  };

  postModal(formData).then(event => {
    alert(`Você fez ${number_tickets} reserva!`);
  });
});