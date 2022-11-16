const params = new URLSearchParams(document.location.search);
const id = params.get('id');

const form = document.getElementById('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  deleteEvent(id).then(() => {
    window.location.href = '/admin.html';
  });
});

async function getEvent(id) {
  try {
    const response = await fetch(
      `https://xp41-soundgarden-api.herokuapp.com/events/${id}`
    );
    const events = await response.json();
    return events;
  } catch(error){
    console.log(error);
  }

}

async function deleteEvent(id) {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events/${id}`,
    {
      method: 'DELETE'
    }
  );
  return response;
}



const event = getEvent(id).then(event => {
 

  const date = new Date(event.scheduled);
  const formattedDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  const name = document.getElementById('name');
  name.value = event.name;

  const banner = document.getElementById('banner');
  banner.value = event.poster;

  const attractions = document.getElementById('attractions');
  attractions.value = event.attractions;

  const description = document.getElementById('description');
  description.innerHTML = event.description;

  const dateInput = document.getElementById('date');
  dateInput.value = formattedDate;

  const tickets = document.getElementById('tickets');
  tickets.value = event.number_tickets;
});
