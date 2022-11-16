const params = new URLSearchParams(document.location.search);
const id = params.get('id');

const form = document.getElementById('form');

async function getEvent(id, formData) {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events/${id}`
  );
  const events = await response.json();
  return events;
}

async function editEvent(id, formData) {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const event = await response.json();
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

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = event.target.name.value;
  const banner = event.target.banner.value;
  const attractions = event.target.attractions.value;
  const description = event.target.description.value;
  const scheduled = event.target.date.value;
  const tickets = event.target.tickets.value;
  
  const dataList = scheduled.split('/');
  const day = dataList[0];
  const month = dataList[1];
  const yearHour = dataList[2];
  const date = month + '/' + day + '/' + yearHour;

  const formData = {
    name,
    poster: banner,
    attractions: attractions.split(','),
    description,
    scheduled: new Date(date).toISOString(),
    number_tickets: parseInt(tickets)
  };

  editEvent(id, formData).then(event => {
    window.location.href = './admin.html';
  });
});
