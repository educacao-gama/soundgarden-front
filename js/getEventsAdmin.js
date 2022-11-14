const table = document.getElementById('eventsTable');

async function getEvents() {
  const response = await fetch(
    'https://xp41-soundgarden-api.herokuapp.com/events'
  );
  const events = await response.json();
  return events;
}

const eventsList = getEvents();
eventsList.then(events => {
  console.log(events);

  events.forEach((event, index) => {
    const date = new Date(event.scheduled);
    const formattedDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(); 
    const rowEvent = `
    <tr>
      <th scope="row">${index +1}</th>
      <td>${formattedDate}</td>
      <td>${event.name}</td>
      <td>${event.attractions}</td>
      <td>
        <a href="reservas.html" class="btn btn-dark">
          ver reservas
        </a>
        <a href="editar.html" class="btn btn-secondary">
          editar
        </a>
        <a href="excluir-evento.html?id=${event._id}" class="btn btn-danger">
          excluir
        </a>
      </td>
    </tr>
    `;
    table.innerHTML += rowEvent;
  });
});
