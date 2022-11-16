const eventDiv = document.querySelector("#event-list");

async function getEvent() {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events`);

  let events = await response.json();

  for (let i = 0; i < 3; i++) {
    let event = events[i];
    const date = new Date(event.scheduled);
    const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    const cardEvento = `
    <article class="evento card p-5 m-3">
        <h2>${event.name} - ${formattedDate}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#cadUsuarioModal">reservar ingresso</a>
    </article>            `;

    eventDiv.innerHTML += cardEvento;
  };
};

getEvent();