const form = document.getElementById('form');

async function postEvent(formData) {
  const response = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events',
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
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = event.target.name.value;
  const attractions = event.target.attractions.value;
  const description = event.target.description.value;
  const scheduled = event.target.scheduled.value;
  const tickets = event.target.tickets.value;

  const dataList = scheduled.split('/');
  const day = dataList[0];
  const month = dataList[1];
  const yearHour = dataList[2];
  const date = month + '/' + day + '/' + yearHour;

  const formData = {
    name,
    attractions: attractions.split(','),
    description,
    scheduled: new Date(date).toISOString(),
    number_tickets: parseInt(tickets),
    poster: '#'
  };

  postEvent(formData).then(event => {
    window.location.href = '/admin.html';
  });
});
