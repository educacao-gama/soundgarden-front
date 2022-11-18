const container = document.getElementById('eventsContainer');
const modalId = document.querySelector('#event-id');
const modalForm = document.querySelector('form');

async function getEvents() {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/events'
    );
    const events = await response.json();
    return events;
    
  } catch(error){
    console.log(error);
  }
}

const eventsList = getEvents();
eventsList.then(events => {
  events.forEach((event, index) => {

    const date = new Date(event.scheduled).toLocaleDateString();
    const rowEvent = `
    <article class="evento card p-5 m-3">
        <h2>${event.name} - ${date}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <a href="#" data-event-id=${event._id} class="btn btn-primary" data-toggle="modal" data-target="#cadUsuarioModal">reservar ingresso</a>
    </article>
    `;
    container.innerHTML += rowEvent;
  });
});

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